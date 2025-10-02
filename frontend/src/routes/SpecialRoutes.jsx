import { Route, Navigate } from 'react-router-dom';


// Rutas de redirección y manejo de errores
export const systemRoutes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    title: 'Redirección Principal'
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-4">Página no encontrada</p>
          <a 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Volver al Dashboard
          </a>
        </div>
      </div>
    ),
    title: 'Página 404'
  }
];


// Función para renderizar rutas del sistema
export const renderSystemRoutes = () => {
  return systemRoutes.map((route, index) => (
    <Route
      key={route.path || `system-${index}`}
      path={route.path}
      element={route.element}
    />
  ));
};