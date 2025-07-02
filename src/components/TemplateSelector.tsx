import { cn } from '@/lib/utils'
import type { TemplateType } from '@/types/invoice'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface TemplateSelectorProps {
  selectedTemplate: TemplateType
  onTemplateSelect: (template: TemplateType) => void
}

const templates = [
    { id: 'modern' as TemplateType, name: 'Modern', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'elegant' as TemplateType, name: 'Elegant', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'professional' as TemplateType, name: 'Professional', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'minimal' as TemplateType, name: 'Minimal', color: 'bg-gray-500 hover:bg-gray-600' },
    { id: 'vibrant' as TemplateType, name: 'Vibrant', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'corporate' as TemplateType, name: 'Corporate', color: 'bg-indigo-500 hover:bg-indigo-600' },
]

export default function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Choose a Template</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                <Button
                    key={template.id}
                    onClick={() => onTemplateSelect(template.id)}
                    variant={selectedTemplate === template.id ? 'default' : 'outline'}
                    className={cn(
                        "h-auto flex-col p-4",
                        selectedTemplate === template.id && `${template.color} text-white`
                    )}
                >
                    <div className={cn("w-full h-12 rounded-sm mb-2", template.color)}/>
                    <span>{template.name}</span>
                </Button>
                ))}
            </div>
        </CardContent>
    </Card>
  )
}
