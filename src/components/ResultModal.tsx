import React, { useEffect } from 'react'

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  originalImageUrl: string | null
  predictedImageUrl: string | null
}

const ResultModal: React.FC<ResultModalProps> = ({ 
  isOpen, 
  onClose, 
  originalImageUrl, 
  predictedImageUrl 
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-auto transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-2xl font-semibold text-gray-900">
              Resultado da Segmentação
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {originalImageUrl && predictedImageUrl ? (
              <div className="space-y-6">
                {/* Imagens lado a lado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Imagem Original */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium text-gray-900 text-center">
                      Imagem Original
                    </h4>
                    <img
                      src={originalImageUrl}
                      alt="Imagem original"
                      className="w-full max-w-sm h-80 object-contain rounded-lg shadow-sm border border-gray-200 mx-auto"
                    />
                    <p className="text-sm text-gray-600 text-center">
                      Imagem de satélite carregada para análise
                    </p>
                  </div>

                  {/* Imagem Segmentada */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium text-gray-900 text-center">
                      Segmentação Predita
                    </h4>
                    <img
                      src={predictedImageUrl}
                      alt="Segmentação predita"
                      className="w-full max-w-sm h-80 object-contain rounded-lg shadow-sm border border-gray-200 mx-auto"
                    />
                    <p className="text-sm text-gray-600 text-center">
                      Resultado da segmentação em 6 classes
                    </p>
                  </div>
                </div>

                {/* Botão de Download */}
                <div className="flex justify-center">
                  <a
                    href={predictedImageUrl}
                    download="predicted_mask.png"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Baixar Segmentação
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>Nenhuma imagem disponível</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Building', color: '#3C1098' },
                { name: 'Land', color: '#8429F6' },
                { name: 'Road', color: '#6EC1E4' },
                { name: 'Vegetation', color: '#FEDD3A' },
                { name: 'Water', color: '#E2A929' },
                { name: 'Unlabeled', color: '#9B9B9B' },
              ].map((cls) => (
                <div key={cls.name} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: cls.color }}
                  />
                  <span className="text-gray-700">{cls.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
