import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import ResultModal from './components/ResultModal'

function App() {
  const [predictedImage, setPredictedImage] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    setIsLoading(true)
    setError(null)

    // Criar URL da imagem original
    const originalImageUrl = URL.createObjectURL(file)
    setOriginalImage(originalImageUrl)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:3338/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao processar imagem')
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setPredictedImage(imageUrl)
      setIsModalOpen(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    if (predictedImage) {
      URL.revokeObjectURL(predictedImage)
      setPredictedImage(null)
    }
    if (originalImage) {
      URL.revokeObjectURL(originalImage)
      setOriginalImage(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Segmentação de Imagens de Satélite
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Faça upload de uma imagem de satélite para obter a segmentação em 6 classes
          </p>

          <ImageUpload 
            onUpload={handleImageUpload} 
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-center">{error}</p>
            </div>
          )}

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Classes de Segmentação</h2>
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

      <ResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        originalImageUrl={originalImage}
        predictedImageUrl={predictedImage}
      />
    </div>
  )
}

export default App
