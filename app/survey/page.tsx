"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  FileText, 
  Type, 
  Hash, 
  Calendar, 
  Clock, 
  Image, 
  CheckSquare, 
  Circle, 
  ChevronDown,
  Eye,
  Settings,
  Download,
  Share2,
  Copy,
  MoreHorizontal
} from 'lucide-react';

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

const SurveyPage = () => {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: '顧客満足度調査',
      description: 'サービス改善のためのアンケートです',
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
    {
      id: '2',
      title: '新機能リクエスト',
      description: '次期リリースで追加したい機能を教えてください',
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
  ]);

  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'surveys' | 'create' | 'edit' | 'templates'>('surveys');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fieldTypes = [
    { type: 'text', label: 'テキスト', icon: Type, description: '1行のテキスト入力' },
    { type: 'textarea', label: '改行可能テキスト', icon: FileText, description: '複数行のテキスト入力' },
    { type: 'number', label: '数字', icon: Hash, description: '数値入力' },
    { type: 'date', label: '年月日', icon: Calendar, description: '日付選択' },
    { type: 'datetime', label: '年月日日時', icon: Calendar, description: '日時選択' },
    { type: 'time', label: '時間', icon: Clock, description: '時刻選択' },
    { type: 'daterange', label: '年月日範囲', icon: Calendar, description: '日付範囲選択' },
    { type: 'datetimerange', label: '年月日日時範囲', icon: Calendar, description: '日時範囲選択' },
    { type: 'timerange', label: '時間範囲', icon: Clock, description: '時刻範囲選択' },
    { type: 'image', label: '画像', icon: Image, description: '画像アップロード' },
    { type: 'checkbox', label: 'チェックボックス', icon: CheckSquare, description: '複数選択可能' },
    { type: 'radio', label: 'ラジオボタン', icon: Circle, description: '単一選択' },
    { type: 'select', label: 'プルダウン', icon: ChevronDown, description: 'ドロップダウン選択' }
  ];

  const templates = [
    {
      id: 'customer-satisfaction',
      title: '顧客満足度調査',
      description: 'サービスや商品の満足度を調査するテンプレート',
      icon: '😊',
      fields: [
        { id: '1', type: 'text', label: 'お名前', required: true, placeholder: '山田太郎' },
        { id: '2', type: 'radio', label: '全体的な満足度', required: true, options: ['とても満足', '満足', '普通', '不満', 'とても不満'] },
        { id: '3', type: 'textarea', label: 'ご意見・ご感想', required: false, placeholder: 'サービスについてのご意見をお聞かせください' },
        { id: '4', type: 'select', label: '年齢層', required: true, options: ['10代', '20代', '30代', '40代', '50代', '60代以上'] },
        { id: '5', type: 'checkbox', label: '利用した機能', required: false, options: ['機能A', '機能B', '機能C', '機能D'] }
      ]
    },
    {
      id: 'event-feedback',
      title: 'イベントアンケート',
      description: 'イベントやセミナーの参加者からのフィードバック',
      icon: '🎉',
      fields: [
        { id: '1', type: 'text', label: '参加者名', required: true, placeholder: '山田太郎' },
        { id: '2', type: 'radio', label: 'イベントの満足度', required: true, options: ['とても満足', '満足', '普通', '不満', 'とても不満'] },
        { id: '3', type: 'textarea', label: '印象に残った内容', required: false, placeholder: '特に印象に残った内容をお聞かせください' },
        { id: '4', type: 'select', label: '参加理由', required: true, options: ['興味があった', '上司の指示', '同僚の紹介', 'その他'] },
        { id: '5', type: 'date', label: '参加日', required: true }
      ]
    },
    {
      id: 'product-feedback',
      title: '商品フィードバック',
      description: '新商品やサービスの利用者からの意見収集',
      icon: '📦',
      fields: [
        { id: '1', type: 'text', label: '商品名', required: true, placeholder: '商品名を入力' },
        { id: '2', type: 'radio', label: '商品の評価', required: true, options: ['とても良い', '良い', '普通', '悪い', 'とても悪い'] },
        { id: '3', type: 'textarea', label: '改善点', required: false, placeholder: '改善してほしい点があればお聞かせください' },
        { id: '4', type: 'number', label: '購入価格', required: false, min: 0 },
        { id: '5', type: 'checkbox', label: '購入理由', required: false, options: ['機能性', 'デザイン', '価格', 'ブランド', '口コミ'] }
      ]
    },
    {
      id: 'employee-survey',
      title: '従業員満足度調査',
      description: '職場環境や働きやすさについての調査',
      icon: '👥',
      fields: [
        { id: '1', type: 'text', label: '部署', required: true, placeholder: '営業部' },
        { id: '2', type: 'radio', label: '職場環境の満足度', required: true, options: ['とても満足', '満足', '普通', '不満', 'とても不満'] },
        { id: '3', type: 'textarea', label: '改善提案', required: false, placeholder: '職場環境の改善提案があればお聞かせください' },
        { id: '4', type: 'select', label: '勤続年数', required: true, options: ['1年未満', '1-3年', '3-5年', '5-10年', '10年以上'] },
        { id: '5', type: 'checkbox', label: '満足している点', required: false, options: ['給与', '福利厚生', '人間関係', '仕事内容', '成長機会'] }
      ]
    }
  ];

  const addField = (type: SurveyField['type']) => {
    if (!currentSurvey) return;

    const newField: SurveyField = {
      id: Date.now().toString(),
      type,
      label: `新しい${fieldTypes.find(f => f.type === type)?.label || 'フィールド'}`,
      required: false,
      options: type === 'checkbox' || type === 'radio' || type === 'select' ? ['オプション1', 'オプション2'] : undefined
    };

    setCurrentSurvey(prev => prev ? {
      ...prev,
      fields: [...prev.fields, newField]
    } : null);
  };

  const updateField = (fieldId: string, updates: Partial<SurveyField>) => {
    if (!currentSurvey) return;

    setCurrentSurvey(prev => prev ? {
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    } : null);
  };

  const removeField = (fieldId: string) => {
    if (!currentSurvey) return;

    setCurrentSurvey(prev => prev ? {
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    } : null);
  };

  const addOption = (fieldId: string) => {
    if (!currentSurvey) return;

    setCurrentSurvey(prev => prev ? {
      ...prev,
      fields: prev.fields.map(field => {
        if (field.id === fieldId && field.options) {
          return {
            ...field,
            options: [...field.options, `オプション${field.options.length + 1}`]
          };
        }
        return field;
      })
    } : null);
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    if (!currentSurvey) return;

    setCurrentSurvey(prev => prev ? {
      ...prev,
      fields: prev.fields.map(field => {
        if (field.id === fieldId && field.options) {
          const newOptions = [...field.options];
          newOptions[optionIndex] = value;
          return { ...field, options: newOptions };
        }
        return field;
      })
    } : null);
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    if (!currentSurvey) return;

    setCurrentSurvey(prev => prev ? {
      ...prev,
      fields: prev.fields.map(field => {
        if (field.id === fieldId && field.options) {
          return {
            ...field,
            options: field.options.filter((_, index) => index !== optionIndex)
          };
        }
        return field;
      })
    } : null);
  };

  const saveSurvey = () => {
    if (!currentSurvey) return;

    if (isCreating) {
      const newSurvey = {
        ...currentSurvey,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        responses: 0,
        isPublished: false
      };
      setSurveys(prev => [...prev, newSurvey]);
    } else {
      setSurveys(prev => prev.map(survey => 
        survey.id === currentSurvey.id ? currentSurvey : survey
      ));
    }

    setCurrentSurvey(null);
    setIsCreating(false);
    setActiveTab('surveys');
  };

  const useTemplate = (template: any) => {
    setCurrentSurvey({
      id: '',
      title: template.title,
      description: template.description,
      fields: template.fields.map((field: any, index: number) => ({
        ...field,
        id: Date.now().toString() + index
      })),
      createdAt: '',
      responses: 0,
      isPublished: false
    });
    setIsCreating(true);
    setActiveTab('create');
  };

  const renderFieldEditor = (field: SurveyField) => {
    const IconComponent = fieldTypes.find(f => f.type === field.type)?.icon || Type;

    return (
      <Card key={field.id} className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <Input
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
                className="text-lg font-semibold border-none bg-transparent p-0 focus-visible:ring-0"
                placeholder="フィールド名を入力"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                必須
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeField(field.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* プレースホルダー */}
          {(field.type === 'text' || field.type === 'textarea') && (
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 block">プレースホルダー</Label>
              <Input
                value={field.placeholder || ''}
                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                placeholder="プレースホルダーテキストを入力"
                className="bg-slate-50 border-slate-200"
              />
            </div>
          )}

          {/* 数値範囲 */}
          {field.type === 'number' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">最小値</Label>
                <Input
                  type="number"
                  value={field.min || ''}
                  onChange={(e) => updateField(field.id, { min: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="最小値"
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">最大値</Label>
                <Input
                  type="number"
                  value={field.max || ''}
                  onChange={(e) => updateField(field.id, { max: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="最大値"
                  className="bg-slate-50 border-slate-200"
                />
              </div>
            </div>
          )}

          {/* オプション */}
          {(field.type === 'checkbox' || field.type === 'radio' || field.type === 'select') && (
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 block">選択肢</Label>
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(field.id, index, e.target.value)}
                      placeholder={`オプション${index + 1}`}
                      className="bg-slate-50 border-slate-200"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(field.id, index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      disabled={field.options!.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOption(field.id)}
                  className="border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  選択肢を追加
                </Button>
              </div>
            </div>
          )}

          {/* プレビュー */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <Label className="text-sm font-medium text-slate-700 mb-3 block">プレビュー</Label>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-800">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              
              {field.type === 'text' && (
                <Input
                  placeholder={field.placeholder || 'テキストを入力'}
                  disabled
                  className="bg-white border-slate-200"
                />
              )}
              
              {field.type === 'textarea' && (
                <Textarea
                  placeholder={field.placeholder || 'テキストを入力'}
                  disabled
                  className="bg-white border-slate-200"
                  rows={3}
                />
              )}
              
              {field.type === 'number' && (
                <Input
                  type="number"
                  placeholder="数値を入力"
                  min={field.min}
                  max={field.max}
                  disabled
                  className="bg-white border-slate-200"
                />
              )}
              
              {field.type === 'date' && (
                <Input
                  type="date"
                  disabled
                  className="bg-white border-slate-200"
                />
              )}
              
              {field.type === 'datetime' && (
                <Input
                  type="datetime-local"
                  disabled
                  className="bg-white border-slate-200"
                />
              )}
              
              {field.type === 'time' && (
                <Input
                  type="time"
                  disabled
                  className="bg-white border-slate-200"
                />
              )}
              
              {field.type === 'daterange' && (
                <div className="flex gap-2">
                  <Input
                    type="date"
                    placeholder="開始日"
                    disabled
                    className="bg-white border-slate-200"
                  />
                  <Input
                    type="date"
                    placeholder="終了日"
                    disabled
                    className="bg-white border-slate-200"
                  />
                </div>
              )}
              
              {field.type === 'datetimerange' && (
                <div className="flex gap-2">
                  <Input
                    type="datetime-local"
                    placeholder="開始日時"
                    disabled
                    className="bg-white border-slate-200"
                  />
                  <Input
                    type="datetime-local"
                    placeholder="終了日時"
                    disabled
                    className="bg-white border-slate-200"
                  />
                </div>
              )}
              
              {field.type === 'timerange' && (
                <div className="flex gap-2">
                  <Input
                    type="time"
                    placeholder="開始時刻"
                    disabled
                    className="bg-white border-slate-200"
                  />
                  <Input
                    type="time"
                    placeholder="終了時刻"
                    disabled
                    className="bg-white border-slate-200"
                  />
                </div>
              )}
              
              {field.type === 'image' && (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Image className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">画像をアップロード</p>
                </div>
              )}
              
              {field.type === 'checkbox' && field.options && (
                <div className="space-y-2">
                  {field.options.map((option, index) => (
                    <Label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        disabled
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className="text-sm text-slate-700">{option}</span>
                    </Label>
                  ))}
                </div>
              )}
              
              {field.type === 'radio' && field.options && (
                <div className="space-y-2">
                  {field.options.map((option, index) => (
                    <Label key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        disabled
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="text-sm text-slate-700">{option}</span>
                    </Label>
                  ))}
                </div>
              )}
              
              {field.type === 'select' && field.options && (
                <select
                  disabled
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm"
                >
                  <option value="">選択してください</option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  アンケート作成
                </h1>
                <p className="text-sm text-slate-600">Googleフォームのようなアンケートを作成</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('templates')}
                className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl"
              >
                テンプレート
              </Button>
              <Button 
                onClick={() => {
                  setActiveTab('create');
                  setIsCreating(true);
                  setCurrentSurvey({
                    id: '',
                    title: '新しいアンケート',
                    description: '',
                    fields: [],
                    createdAt: '',
                    responses: 0,
                    isPublished: false
                  });
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                新しいアンケート
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* タブナビゲーション */}
        <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 mb-8 border border-slate-200">
          <button
            onClick={() => setActiveTab('surveys')}
            className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'surveys'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            アンケート一覧
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'templates'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            テンプレート
          </button>
          <button
            onClick={() => {
              setActiveTab('create');
              setIsCreating(true);
              setCurrentSurvey({
                id: '',
                title: '新しいアンケート',
                description: '',
                fields: [],
                createdAt: '',
                responses: 0,
                isPublished: false
              });
            }}
            className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'create'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            新規作成
          </button>
        </div>

        {/* アンケート一覧 */}
        {activeTab === 'surveys' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <Card key={survey.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-indigo-300 rounded-2xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                          {survey.title}
                        </CardTitle>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                          {survey.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{survey.fields.length} 項目</span>
                      <span>•</span>
                      <span>{survey.responses} 回答</span>
                      <span>•</span>
                      <span>{survey.createdAt}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2">
                      <Badge variant={survey.isPublished ? "default" : "secondary"} className="text-xs">
                        {survey.isPublished ? '公開中' : '下書き'}
                      </Badge>
                      
                      <div className="flex items-center gap-1 ml-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentSurvey(survey);
                            setActiveTab('edit');
                            setIsCreating(false);
                          }}
                          className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/survey/answer/${survey.id}`)}
                          className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* テンプレート一覧 */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-indigo-300 rounded-2xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">{template.icon}</span>
                          <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {template.title}
                          </CardTitle>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                          {template.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{template.fields.length} 項目</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-indigo-50 border-indigo-200 text-indigo-600">
                        テンプレート
                      </Badge>
                      
                      <Button
                        onClick={() => useTemplate(template)}
                        className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                      >
                        このテンプレートを使用
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* アンケート作成・編集 */}
        {(activeTab === 'create' || activeTab === 'edit') && currentSurvey && (
          <div className="space-y-8">
            {/* 基本情報 */}
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">アンケートタイトル</Label>
                  <Input
                    value={currentSurvey.title}
                    onChange={(e) => setCurrentSurvey(prev => prev ? { ...prev, title: e.target.value } : null)}
                    placeholder="アンケートのタイトルを入力"
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">説明</Label>
                  <Textarea
                    value={currentSurvey.description}
                    onChange={(e) => setCurrentSurvey(prev => prev ? { ...prev, description: e.target.value } : null)}
                    placeholder="アンケートの説明を入力"
                    className="bg-slate-50 border-slate-200"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* フィールド追加 */}
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">フィールド追加</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {fieldTypes.map((fieldType) => {
                    const IconComponent = fieldType.icon;
                    return (
                      <button
                        key={fieldType.type}
                        onClick={() => addField(fieldType.type as SurveyField['type'])}
                        className="p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left group"
                      >
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition-colors">
                          <IconComponent className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="font-medium text-slate-800 mb-1">{fieldType.label}</h3>
                        <p className="text-xs text-slate-500">{fieldType.description}</p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* フィールド一覧 */}
            {currentSurvey.fields.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">フィールド一覧</h2>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentSurvey(null);
                        setIsCreating(false);
                        setActiveTab('surveys');
                      }}
                      className="border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 rounded-xl"
                    >
                      キャンセル
                    </Button>
                    <Button
                      onClick={saveSurvey}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      {isCreating ? '作成' : '保存'}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {currentSurvey.fields.map((field) => renderFieldEditor(field))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
