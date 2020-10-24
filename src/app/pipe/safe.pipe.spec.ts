import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DomSanitizer } from '@angular/platform-browser'
import { SafePipe } from './safe.pipe'

describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new SafePipe(null)
    expect(pipe).toBeTruthy()
  })
})
