import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  InformationCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';

function Alert({ type = 'info', title, message, onClose }) {
  const alertStyles = {
    success: {
      container: 'bg-green-50 border border-green-200',
      icon: CheckCircleIcon,
      iconColor: 'text-green-600',
      titleColor: 'text-green-800',
      messageColor: 'text-green-700'
    },
    error: {
      container: 'bg-red-50 border border-red-200',
      icon: XCircleIcon,
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700'
    },
    warning: {
      container: 'bg-yellow-50 border border-yellow-200',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800',
      messageColor: 'text-yellow-700'
    },
    info: {
      container: 'bg-blue-50 border border-blue-200',
      icon: InformationCircleIcon,
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      messageColor: 'text-blue-700'
    }
  };

  const style = alertStyles[type];
  const Icon = style.icon;

  return (
    <div className={`rounded-lg p-4 mb-4 ${style.container}`}>
      <div className="flex">
        <Icon className={`h-5 w-5 ${style.iconColor} mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${style.titleColor} mb-1`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`text-sm ${style.messageColor}`}>
              {message}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-3 ${style.iconColor} hover:opacity-75 transition-opacity`}
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;