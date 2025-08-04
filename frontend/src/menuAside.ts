import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/categories/categories-list',
    label: 'Categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTag' in icon ? icon['mdiTag' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CATEGORIES'
  },
  {
    href: '/coffee_blends/coffee_blends-list',
    label: 'Coffee blends',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCoffee' in icon ? icon['mdiCoffee' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COFFEE_BLENDS'
  },
  {
    href: '/customers/customers-list',
    label: 'Customers',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiAccount' in icon ? icon['mdiAccount' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CUSTOMERS'
  },
  {
    href: '/orders/orders-list',
    label: 'Orders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPackageVariantClosed' in icon ? icon['mdiPackageVariantClosed' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ORDERS'
  },
  {
    href: '/payments/payments-list',
    label: 'Payments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCreditCard' in icon ? icon['mdiCreditCard' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PAYMENTS'
  },
  {
    href: '/reports/reports-list',
    label: 'Reports',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiChartLine' in icon ? icon['mdiChartLine' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_REPORTS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
