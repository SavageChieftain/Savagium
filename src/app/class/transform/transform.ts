import { CSSNumber } from './css-number'
// eslint-disable-next-line import/no-cycle
import { Matrix3D } from './matrix-3d'

export interface IPoint2D {
  x: number
  y: number
}
export interface IPoint3D extends IPoint2D {
  z: number
  w: number
}
export class Transform {
  private element: HTMLElement

  private matrix: Matrix3D = new Matrix3D()

  private sceneTransform: Matrix3D = new Matrix3D()

  private inverseSceneTransform: Matrix3D = new Matrix3D()

  private paddingLeft: number

  private paddingTop: number

  private marginLeft: number

  private marginTop: number

  private borderLeft: number

  private borderTop: number

  constructor(element: HTMLElement) {
    this.initialize(element)
  }

  clear(): Transform {
    this.element = null
    this.matrix.identity()

    return this
  }

  private initialize(element: HTMLElement) {
    if (!element) return

    this.element = element

    const style = window.getComputedStyle(element)

    let parentWidth = 0
    let parentHeight = 0
    if (this.element.parentElement) {
      parentWidth = this.element.parentElement.clientWidth
      parentHeight = this.element.parentElement.clientHeight
    } else {
      parentWidth = window.innerWidth
      parentHeight = window.innerHeight
    }
    this.paddingLeft = CSSNumber.relation(style.paddingTop, parentWidth)
    this.paddingTop = CSSNumber.relation(style.paddingTop, parentHeight)
    this.marginLeft = CSSNumber.relation(style.marginLeft, parentWidth)
    this.marginTop = CSSNumber.relation(style.marginTop, parentHeight)
    this.borderLeft = CSSNumber.relation(style.borderLeft, parentWidth)
    this.borderTop = CSSNumber.relation(style.borderTop, parentHeight)

    this.matrix.setCSS(style.transform)
    this.sceneTransform.identity()
    this.extract(this, this.sceneTransform)
    this.sceneTransform.invert(this.inverseSceneTransform)

    // eslint-disable-next-line consistent-return
    return this
  }

  globalToLocal(x: number, y: number, z: number = 0): IPoint3D {
    const ret: IPoint3D = { x, y, z, w: 1 }
    this.inverseSceneTransform.unproject(ret, ret)
    this.fromBorderBox(ret)
    return ret
  }

  localToGlobal(x: number, y: number, z: number = 0): IPoint3D {
    const ret: IPoint3D = { x, y, z, w: 1 }
    this.sceneTransform.project(ret, ret)
    this.fromBorderBox(ret)
    return ret
  }

  localToLocal(x: number, y: number, z: number, to: HTMLElement): IPoint3D {
    const local: IPoint3D = { x, y, z, w: 1 }
    const transformer: Transform = new Transform(to)
    const matrix = Matrix3D.multiply(this.sceneTransform, transformer.inverseSceneTransform)
    const ret: IPoint3D = { x: 0, y: 0, z: 0, w: 1 }

    ret.x =
      local.x * matrix.m11 + local.y * matrix.m21 + local.z * matrix.m31 + local.w * matrix.m41
    ret.y =
      local.x * matrix.m12 + local.y * matrix.m22 + local.z * matrix.m32 + local.w * matrix.m42
    ret.z =
      local.x * matrix.m13 + local.y * matrix.m23 + local.z * matrix.m33 + local.w * matrix.m43
    ret.w =
      local.x * matrix.m14 + local.y * matrix.m24 + local.z * matrix.m34 + local.w * matrix.m44

    transformer.clear()
    this.toBorderBox(ret)
    return ret
  }

  private extract(transform: Transform, matrix: Matrix3D): void {
    const { element } = transform
    let node = element

    while (node) {
      this.extractMatrix(node, matrix)
      if (node && node.style.position === 'fixed') {
        console.warn('fixed領域は計算が不正確')
        matrix.appendPosition(window.pageXOffset, window.pageYOffset, 0)
      }
      node = node.parentElement
    }
  }

  private extractMatrix(node: HTMLElement, matrix: Matrix3D = null): Matrix3D {
    // eslint-disable-next-line no-param-reassign
    if (!matrix) matrix = new Matrix3D()
    if (!node) return matrix

    const element: HTMLElement = node
    const style: CSSStyleDeclaration = window.getComputedStyle(node)

    // eslint-disable-next-line eqeqeq
    if (style.transform != 'none') {
      const origin = style.transformOrigin ? style.transformOrigin.split(' ') : []
      const originX = CSSNumber.relation(origin[0], element.offsetWidth, element.offsetWidth * 0.5)
      const originY = CSSNumber.relation(
        origin[1],
        element.offsetHeight,
        element.offsetHeight * 0.5,
      )
      const originZ = CSSNumber.relation(origin[2], 0, 0)

      matrix.appendPosition(-originX, -originY, -originZ)
      matrix.appendCSS(style.transform)
      matrix.appendPosition(originX, originY, originZ)
    }

    const position = this.getPosition(node)
    matrix.appendPosition(position.x, position.y, 0)

    let perspective = 0
    if (node.parentElement) {
      const parentStyle: CSSStyleDeclaration = window.getComputedStyle(node.parentElement)
      perspective = CSSNumber.parse(parentStyle.perspective)
    }

    if (node.parentElement && perspective) {
      const parentStyle: CSSStyleDeclaration = window.getComputedStyle(node.parentElement)
      const perspectiveOrigin = parentStyle.perspectiveOrigin.split(' ')
      const perspectiveOriginX = CSSNumber.relation(
        perspectiveOrigin[0],
        element.parentElement.offsetWidth,
      )
      const perspectiveOriginY = CSSNumber.relation(
        perspectiveOrigin[1],
        element.parentElement.offsetHeight,
      )

      matrix.appendPosition(-perspectiveOriginX, -perspectiveOriginY, 0)
      matrix.appendPerspective(perspective)
      matrix.appendPosition(perspectiveOriginX, perspectiveOriginY, 0)
    }

    return matrix
  }

  private createXElseResult(node) {
    if (node.parentElement === node.offsetParent) {
      return node.offsetLeft
    }
    if (node.parentElement.offsetParent === node.offsetParent) {
      return node.offsetLeft - node.parentElement.offsetLeft
    }
    return 0
  }

  private createYElseResult(node) {
    if (node.parentElement === node.offsetParent) {
      return node.offsetTop
    }
    if (node.parentElement.offsetParent === node.offsetParent) {
      return node.offsetTop - node.parentElement.offsetTop
    }
    return 0
  }

  private getPosition(node: HTMLElement): IPoint2D {
    const ret: IPoint2D = { x: 0, y: 0 }
    ret.x = !node.offsetParent ? node.offsetLeft : this.createXElseResult(node)
    ret.y = !node.offsetParent ? node.offsetTop : this.createYElseResult(node)

    ret.x += node.offsetParent ? node.offsetParent.clientLeft : 0
    ret.y += node.offsetParent ? node.offsetParent.clientTop : 0
    return ret
  }

  private fromBorderBox(point: IPoint3D): void {
    point.x += this.paddingLeft
    point.y += this.paddingTop
    point.x += this.marginLeft
    point.y += this.marginTop
    point.x -= this.borderLeft
    point.y -= this.borderTop
  }

  private toBorderBox(point: IPoint3D): void {
    point.x -= this.paddingLeft
    point.y -= this.paddingTop
    point.x -= this.marginLeft
    point.y -= this.marginTop
    point.x += this.borderLeft
    point.y += this.borderTop
  }
}
