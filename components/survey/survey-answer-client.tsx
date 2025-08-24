"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  FileText,
  Type,
  Hash,
  Calendar,
  Clock,
  Image,
  CheckSquare,
  Circle,
  ChevronDown,
  Send,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SurveyField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'datetime' | 'time' | 'daterange' | 'datetimerange' | 'timerange' | 'image' | 'checkbox' | 'radio' | 'select';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  fields: SurveyField[];
  createdAt: string;
  responses: number;
  isPublished: boolean;
}

interface SurveyResponse {
  fieldId: string;
  value: string | string[] | number | File | null;
}

const SurveyAnswerClient = ({ surveyId }: { surveyId: string }) => {
  const router = useRouter();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // モックデータ（実際のアプリではAPIから取得）
  useEffect(() => {
    const mockSurveys: Record<string, Survey> = {
      '1': {
        id: '1',
        title: '顧客満足度調査',
        description: 'サービス改善のためのアンケートです。お客様のご意見をお聞かせください。',
        fields: [
          { id: '1', type: 'text', label: 'お名前', required: true, placeholder: '山田太郎' },
          { id: '2', type: 'textarea', label: 'ご意見・ご感想', required: false, placeholder: 'サービスについてのご意見をお聞かせください' },
          { id: '3', type: 'radio', label: '満足度', required: true, options: ['とても満足', '満足', '普通', '不満', 'とても不満'] },
          { id: '4', type: 'checkbox', label: '利用した機能', required: false, options: ['機能A', '機能B', '機能C', '機能D'] },
          { id: '5', type: 'select', label: '年齢層', required: true, options: ['10代', '20代', '30代', '40代', '50代', '60代以上'] },
          { id: '6', type: 'number', label: '利用回数', required: false, min: 1, max: 100 },
          { id: '7', type: 'date', label: '初回利用日', required: false },
          { id: '8', type: 'image', label: 'スクリーンショット', required: false }
        ],
        createdAt: '2025-01-20',
        responses: 45,
        isPublished: true
      },
      '2': {
        id: '2',
        title: '新機能リクエスト',
        description: '次期リリースで追加したい機能を教えてください。',
        fields: [
          { id: '1', type: 'text', label: '機能名', required: true, placeholder: '例：ダークモード' },
          { id: '2', type: 'textarea', label: '機能の詳細', required: true, placeholder: 'どのような機能か詳しく説明してください' },
          { id: '3', type: 'select', label: '優先度', required: true, options: ['高', '中', '低'] },
          { id: '4', type: 'checkbox', label: '対象プラットフォーム', required: false, options: ['Web', 'iOS', 'Android', 'デスクトップ'] }
        ],
        createdAt: '2025-01-19',
        responses: 23,
        isPublished: false
      }
    };
    
    const foundSurvey = mockSurveys[surveyId];
    if (foundSurvey) {
      setSurvey(foundSurvey);
      // 初期レスポンス配列を作成
      const initialResponses: SurveyResponse[] = foundSurvey.fields.map(field => ({
        fieldId: field.id,
        value: field.type === 'checkbox' ? [] : null
      }));
      setResponses(initialResponses);
    }
  }, [surveyId]);

  const updateResponse = (fieldId: string, value: string | string[] | number | File | null) => {
    setResponses(prev => prev.map(response => 
      response.fieldId === fieldId ? { ...response, value } : response
    ));
    
    // エラーをクリア
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateField = (field: SurveyField, value: any): string | null => {
    if (field.required) {
      if (field.type === 'checkbox') {
        if (!Array.isArray(value) || value.length === 0) {
          return 'この項目は必須です';
        }
      } else if (!value || (typeof value === 'string' && value.trim() === '')) {
        return 'この項目は必須です';
      }
    }

    if (field.type === 'number' && value) {
      const numValue = Number(value);
      if (field.min !== undefined && numValue < field.min) {
        return `最小値は${field.min}です`;
      }
      if (field.max !== undefined && numValue > field.max) {
        return `最大値は${field.max}です`;
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    if (!survey) return;

    // 全フィールドをバリデーション
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    survey.fields.forEach(field => {
      const response = responses.find(r => r.fieldId === field.id);
      const error = validateField(field, response?.value);
      if (error) {
        newErrors[field.id] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // 実際のアプリではAPIに送信
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleImageUpload = (fieldId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // ファイルサイズチェック（5MB以下）
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldId]: 'ファイルサイズは5MB以下にしてください' }));
        return;
      }
      
      // 画像ファイルかチェック
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [fieldId]: '画像ファイルを選択してください' }));
        return;
      }

      updateResponse(fieldId, file);
    }
  };

  const renderField = (field: SurveyField) => {
    const response = responses.find(r => r.fieldId === field.id);
    const error = errors[field.id];

    return (
      <div key={field.id} className="space-y-3">
        <Label className="text-base font-semibold text-slate-800">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        {field.type === 'text' && (
          <Input
            value={response?.value as string || ''}
            onChange={(e) => updateResponse(field.id, e.target.value)}
            placeholder={field.placeholder || 'テキストを入力'}
            className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
          />
        )}
        
        {field.type === 'textarea' && (
          <Textarea
            value={response?.value as string || ''}
            onChange={(e) => updateResponse(field.id, e.target.value)}
            placeholder={field.placeholder || 'テキストを入力'}
            className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
            rows={4}
          />
        )}
        
        {field.type === 'number' && (
          <Input
            type="number"
            value={response?.value as number || ''}
            onChange={(e) => updateResponse(field.id, e.target.value ? Number(e.target.value) : null)}
            placeholder="数値を入力"
            min={field.min}
            max={field.max}
            step={field.step}
            className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
          />
        )}
        
        {field.type === 'date' && (
          <Input
            type="date"
            value={response?.value as string || ''}
            onChange={(e) => updateResponse(field.id, e.target.value)}
            className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
          />
        )}
        
        {field.type === 'datetime' && (
          <Input
            type="datetime-local"
            value={response?.value as string || ''}
            onChange={(e) => updateResponse(field.id, e.target.value)}
            className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
          />
        )}
        
        {field.type === 'time' && (
          <Input
            type="time"
            value={response?.value as string || ''}
            onChange={(e) => updateResponse(field.id, e.target.value)}
            className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
          />
        )}
        
        {field.type === 'daterange' && (
          <div className="flex gap-2">
            <Input
              type="date"
              placeholder="開始日"
              className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
            />
            <Input
              type="date"
              placeholder="終了日"
              className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
            />
          </div>
        )}
        
        {field.type === 'datetimerange' && (
          <div className="flex gap-2">
            <Input
              type="datetime-local"
              placeholder="開始日時"
              className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
            />
            <Input
              type="datetime-local"
              placeholder="終了日時"
              className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
            />
          </div>
        )}
        
        {field.type === 'timerange' && (
          <div className="flex gap-2">
            <Input
              type="time"
              placeholder="開始時刻"
              className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
            />
            <Input
              type="time"
              placeholder="終了時刻"
              className={`bg-white border-slate-200 ${error ? 'border-red-300 focus:border-red-500' : ''}`}
            />
          </div>
        )}
        
        {field.type === 'image' && (
          <div>
            <input
              ref={(el) => { fileInputRefs.current[field.id] = el; }}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(field.id, e)}
              className="hidden"
            />
            <div
              onClick={() => fileInputRefs.current[field.id]?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                error ? 'border-red-300 bg-red-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              {response?.value ? (
                <div className="space-y-2">
                  <Image className="w-8 h-8 text-indigo-600 mx-auto" />
                  <p className="text-sm text-indigo-600 font-medium">
                    {(response.value as File).name}
                  </p>
                  <p className="text-xs text-slate-500">クリックして変更</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Image className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-sm text-slate-500">画像をアップロード</p>
                  <p className="text-xs text-slate-400">クリックして選択</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {field.type === 'checkbox' && field.options && (
          <div className="space-y-3">
            {field.options.map((option, index) => (
              <Label key={index} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(response?.value as string[] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = response?.value as string[] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    updateResponse(field.id, newValues);
                  }}
                  className="w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-slate-700">{option}</span>
              </Label>
            ))}
          </div>
        )}
        
        {field.type === 'radio' && field.options && (
          <div className="space-y-3">
            {field.options.map((option, index) => (
              <Label key={index} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={response?.value === option}
                  onChange={(e) => updateResponse(field.id, e.target.value)}
                  className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-slate-700">{option}</span>
              </Label>
            ))}
          </div>
        )}
        
        {field.type === 'select' && field.options && (
          <select
            value={response?.value as string || ''}
            onChange={(e) => updateResponse(field.id, e.target.value)}
            className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
            }`}
          >
            <option value="">選択してください</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )}
        
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    );
  };

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">回答完了</h2>
            <p className="text-slate-600 mb-6">
              アンケートへのご協力ありがとうございました。
            </p>
            <Button
              onClick={() => router.push('/survey')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              アンケート一覧に戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/survey')}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            アンケート一覧に戻る
          </Button>
          
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                {survey.title}
              </CardTitle>
              <p className="text-slate-600">
                {survey.description}
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* 回答フォーム */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl">
          <CardContent className="p-8">
            <div className="space-y-8">
              {survey.fields.map((field) => renderField(field))}
            </div>
            
            {/* 送信ボタン */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    送信中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    回答を送信
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurveyAnswerClient;
