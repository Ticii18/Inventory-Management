import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function PageHeader({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = 'text-blue-600', 
  actions, 
  showBackButton = false, 
  backTo = '/dashboard' 
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={() => navigate(backTo)}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            )}
            
            {Icon && <Icon className={`h-8 w-8 ${iconColor} mr-3`} />}
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
          </div>
          
          {actions && (
            <div className="flex items-center space-x-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;