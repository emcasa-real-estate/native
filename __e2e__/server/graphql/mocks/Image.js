import faker from 'faker'

const filename = [
  'acljsnpuaskhivs7bfsm.jpg',
  'yh0t1pdpjnsfdaqlyvb2.jpg',
  'cxwhu4lmbwylg9i3xsue.jpg',
  'gme6nu6gfsuhrsrit1j3.jpg',
  'qmd7ywztniugiouvbise.jpg',
  'tulqhnivaprcmlxnokjz.jpg',
  'ecesbnypmloxas5uhma3.jpg',
  'caodilvitc2kq2kzonp1.jpg',
  'oysqygybihhlyv3ym2et.jpg',
  'czgyiej5u1300j7v1hed.jpg',
  'vqtf0mef5i9vvahbzt7n.jpg'
]
export default () => ({
  filename: () => faker.random.arrayElement(filename),
  isActive: () => true,
  position: 1
})
