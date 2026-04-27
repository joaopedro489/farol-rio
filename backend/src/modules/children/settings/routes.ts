const API_BASE_ROUTE = '/api/children'

export const ChildrenSettingsRoutes = {
  BROWSE: API_BASE_ROUTE,
  NEIGHBORHOODS: `${API_BASE_ROUTE}/neighborhoods`,
  READ: `${API_BASE_ROUTE}/:id`,
  REVIEW: `${API_BASE_ROUTE}/:id/review`,
}
