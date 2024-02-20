
import { describe, expect, it } from 'vitest'
import { extraerBuenbit } from '@/finanzas/rendimientos/extraerBuenbit.esjs'
import { extraerFiwind } from '@/finanzas/rendimientos/extraerFiwind.esjs'
import { extraerLetsbit } from '@/finanzas/rendimientos/extraerLetsbit.esjs'
import { extraerBelo } from '@/finanzas/rendimientos/extraerBelo.esjs'

function testItems(items) {
  expect(items.length).toBeGreaterThan(0)

  for (const item of items) {
    expect(item.moneda).toBeTypeOf('string')
    expect(item.apy).toBeTypeOf('number')
    expect(item.fecha).toBeTypeOf('string')
  }
}

describe('extraerRendimientos', () => {
  it('guarda buenbit', async () => {
    const items = await extraerBuenbit()

    testItems(items)
  })

  it('guarda fiwind', async () => {
    const items = await extraerFiwind()

    testItems(items)
  })

  it('guarda letsbit', async () => {
    const items = await extraerLetsbit()

    testItems(items)
  })

  it('guarda belo', async () => {
    const items = await extraerBelo()

    testItems(items)
  })
})
