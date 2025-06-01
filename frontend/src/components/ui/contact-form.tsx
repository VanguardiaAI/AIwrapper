'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  service_type: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service_type: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage('¡Gracias por tu consulta! Te contactaremos pronto para discutir tu AI Wrapper.')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service_type: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setStatusMessage(result.error || 'Error al enviar el formulario')
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('Error de conexión. Inténtalo más tarde.')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-2xl text-white text-center">
          Solicita tu AI Wrapper Personalizado
        </CardTitle>
        <p className="text-gray-300 text-center">
          Cuéntanos qué modelo de IA quieres usar y cómo podemos ayudarte a crear tu producto
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                Nombre *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-2">
                Empresa
              </label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Tu empresa"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
                Teléfono
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service_type" className="block text-sm font-medium text-gray-200 mb-2">
              Tipo de AI Wrapper
            </label>
            <select
              id="service_type"
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecciona el tipo de producto</option>
              <option value="chatbot">Chatbot Inteligente (GPT, Claude, Gemini)</option>
              <option value="content-generator">Generador de Contenido</option>
              <option value="predictive-analytics">Análisis Predictivo</option>
              <option value="recommendation-engine">Sistema de Recomendación</option>
              <option value="document-processing">Procesamiento de Documentos</option>
              <option value="custom-api">API Personalizada</option>
              <option value="saas-platform">Plataforma SaaS Completa</option>
              <option value="consultation">Consultoría de AI Models</option>
              <option value="other">Otro (especificar en mensaje)</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
              Describe tu Proyecto *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Describe qué modelo de IA quieres usar (GPT-4, Claude, Gemini, etc.), qué problema quieres resolver, y cualquier detalle importante sobre tu proyecto..."
            />
          </div>

          {submitStatus !== 'idle' && (
            <div className={`p-4 rounded-md ${
              submitStatus === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-200' 
                : 'bg-red-500/20 border border-red-500/30 text-red-200'
            }`}>
              {statusMessage}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar MI AI Wrapper'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 