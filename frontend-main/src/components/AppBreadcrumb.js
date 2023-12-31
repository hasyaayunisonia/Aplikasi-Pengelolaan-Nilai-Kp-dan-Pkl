import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const length = pathname.split('/').length
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : pathname.split('/')[length - 1]
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        pathname:
          array[index] === 'detailPerusahaan' ||
          array[index] === 'detailCV' ||
          array[index] === 'updatePerusahaan' ||
          array[index] === 'penilaianSeminar'
            ? `${currentPathname}/${array[array.length - 1]}`
            : currentPathname,
        name: getRouteName(currentPathname, routes),
        active:
          index + 1 === array.length ||
          ((array[index] === 'prerequisite' ||
            array[index] === 'detailCV' ||
            array[index] === 'updateCV' ||
            array[index] === 'updatePrerequisite' ||
            array[index] === 'detailPerusahaan' ||
            array[index] === 'updatePerusahaan' ||
            array[index] === 'detailEvaluasi' ||
            array[index] === 'detailFeedback' ||
            array[index] === 'hasilEvaluasiPerusahaan' ||
            array[index] === 'dataEvaluasiPerusahaan' ||
            array[index] === 'detailEvaluasiPerusahaan' ||
            array[index] === 'formulirEvaluasiPerusahaan' ||
            array[index] === 'detailFeedbackPerusahaan' ||
            array[index] === 'penilaianSeminar' ||
            array[index] === 'tambahNilaiPeserta' ||
            array[index] === 'formulirFeedbackPerusahaan') &&
            index === array.length - 2) ||
          (array[index] === 'detailPerusahaan' && index === array.length - 3)
            ? true
            : false,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
