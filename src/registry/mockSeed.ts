import { useDataEngine } from '@kietvpt/uiforge-core'

let seeded = false

export function seedDocsMockDatasets() {
  if (seeded) return
  seeded = true

  const engine = useDataEngine.getState()

  engine.registerDataset('Vendor', [
    {
      id: 'V001',
      code: 'VND-001',
      name: 'Acme Global Logistics',
      taxCode: '0101234567',
      country: 'VN',
      city: 'Ho Chi Minh City',
      contact: 'contact@acmelogistics.vn',
    },
    {
      id: 'V002',
      code: 'VND-002',
      name: 'Pacific Ocean Freight Corp',
      taxCode: '0309876543',
      country: 'SG',
      city: 'Singapore',
      contact: 'ops@pacificfreight.sg',
    },
    {
      id: 'V003',
      code: 'VND-003',
      name: 'Nordic Supply Systems',
      taxCode: '0405556677',
      country: 'DE',
      city: 'Hamburg',
      contact: 'hello@nordicsupply.de',
    },
    {
      id: 'V004',
      code: 'VND-004',
      name: 'Sunrise Tech Manufacturing',
      taxCode: '0207778899',
      country: 'JP',
      city: 'Tokyo',
      contact: 'sales@sunrisetech.jp',
    },
  ])

  engine.registerDataset('Product', [
    { id: 'P01', code: 'PRD-100', name: 'Enterprise Server Rack 42U', category: 'Hardware', price: 2450, stock: 18 },
    { id: 'P02', code: 'PRD-200', name: 'Fiber Optic Switch 48-Port', category: 'Networking', price: 1120, stock: 42 },
    { id: 'P03', code: 'PRD-300', name: 'Industrial Barcode Scanner', category: 'IoT', price: 320, stock: 115 },
    { id: 'P04', code: 'PRD-400', name: 'Thermal Label Printer Pro', category: 'Hardware', price: 480, stock: 64 },
  ])

  engine.registerDataset('Department', [
    { id: 1, name: 'UIForge Enterprise Group', parentId: null },
    { id: 2, name: 'Engineering Division', parentId: 1 },
    { id: 3, name: 'Frontend Core Team', parentId: 2 },
    { id: 4, name: 'Backend .NET Team', parentId: 2 },
    { id: 5, name: 'Product & Design', parentId: 1 },
    { id: 6, name: 'UX Research', parentId: 5 },
  ])

  engine.registerDataset('Customer', [
    { id: 'C01', code: 'CUS-001', name: 'VietStar Retail JSC', tier: 'Enterprise', creditLimit: 500000 },
    { id: 'C02', code: 'CUS-002', name: 'Mekong Distribution Co.', tier: 'Gold', creditLimit: 250000 },
    { id: 'C03', code: 'CUS-003', name: 'Alpha Healthcare Group', tier: 'Enterprise', creditLimit: 750000 },
  ])
}
