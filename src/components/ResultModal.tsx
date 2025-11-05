import React, { useEffect } from 'react'

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string | null
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, imageUrl }) => {
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto transform transition-all">
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
            {imageUrl ? (
              <div className="space-y-4">
                <img
                  src={imageUrl}
                  alt="Segmentação predita"
                  className="w-full rounded-lg shadow-sm"
                />
                <div className="flex gap-3 justify-end">
                  <a
                    href={imageUrl}
                    download="predicted_mask.png"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
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
                    Baixar Imagem
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Nenhuma imagem disponível
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <p className="text-sm text-gray-600">
              A imagem mostra a segmentação em 6 classes: Building, Land, Road, Vegetation, Water e Unlabeled.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
