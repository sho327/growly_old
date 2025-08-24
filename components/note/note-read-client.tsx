"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Bookmark, 
  Calendar,
  User,
  Eye,
  MessageCircle,
  Download,
  Edit3
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Note {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  likes: number;
  views: number;
  isPublic: boolean;
  images: string[];
}

interface NoteReadClientProps {
  noteId: string;
}

const NoteReadClient = ({ noteId }: NoteReadClientProps) => {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  // モックデータ（実際のアプリではAPIから取得）
  useEffect(() => {
    const mockNotes: Record<string, Note> = {
      '1': {
        id: '1',
        title: '今日のアイデア',
        content: `# 今日のアイデア

## 新しいプロジェクトについて

今日、とても興味深いアイデアを思いつきました。

### 主なポイント
- ユーザビリティを重視
- モダンなデザイン
- パフォーマンス最適化

> これは素晴らしいアイデアだと思います！

**次回の会議で共有しよう。**

## 技術的な詳細

\`\`\`javascript
// サンプルコード
function createProject() {
  return {
    name: "新しいプロジェクト",
    features: ["UX", "デザイン", "パフォーマンス"]
  };
}
\`\`\`

### 実装予定
1. **フェーズ1**: 基本機能の実装
2. **フェーズ2**: UI/UXの改善
3. **フェーズ3**: パフォーマンス最適化

とても楽しみです！`,
        author: '田中太郎',
        createdAt: '2025-01-20',
        updatedAt: '2025-01-20',
        tags: ['アイデア', 'プロジェクト', 'デザイン'],
        likes: 12,
        views: 45,
        isPublic: true,
        images: []
      },
      '2': {
        id: '2',
        title: '読書メモ：デザイン思考',
        content: `# デザイン思考について

最近読んだ本のメモです。

## 重要な概念
1. **共感** - ユーザーの気持ちを理解する
2. **定義** - 問題を明確にする
3. **アイデア** - 創造的な解決策を考える
4. **プロトタイプ** - 形にする
5. **テスト** - 検証する

とても参考になりました！`,
        author: '佐藤花子',
        createdAt: '2025-01-19',
        updatedAt: '2025-01-19',
        tags: ['読書', 'デザイン思考', 'メモ'],
        likes: 8,
        views: 32,
        isPublic: true,
        images: []
      }
    };
    
    const foundNote = mockNotes[noteId];
    if (foundNote) {
      setNote(foundNote);
    }
  }, [noteId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    if (note) {
      setNote(prev => prev ? { ...prev, likes: prev.likes + (isLiked ? -1 : 1) } : null);
      setIsLiked(!isLiked);
    }
  };

  const renderMarkdown = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-800 mb-6 mt-8 first:mt-0">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium text-slate-800 mb-3 mt-6">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-medium text-slate-800 mb-2 mt-4">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded-md text-sm font-mono text-slate-800">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm font-mono text-slate-800">$2</code></pre>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-200 pl-6 py-2 my-4 bg-indigo-50 rounded-r-lg italic text-slate-700">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-1 text-slate-700">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-1 text-slate-700">$1</li>')
      .replace(/\n/g, '<br>');
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* メタ情報 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {note.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(note.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {note.views} 回閲覧
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* メインコンテンツ */}
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-bold text-slate-800 leading-tight">
              {note.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pb-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-strong:text-slate-800 prose-code:text-slate-800 prose-blockquote:border-indigo-200 prose-blockquote:bg-indigo-50"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }}
            />
          </CardContent>
        </Card>

        {/* アクション */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                isLiked 
                  ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                  : 'border-slate-200 hover:border-pink-300 hover:bg-pink-50 text-slate-600 hover:text-pink-600'
              } rounded-xl`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {note.likes + (isLiked ? 1 : 0)}
            </Button>
            
            <Button variant="outline" className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl">
              <MessageCircle className="w-5 h-5 mr-2" />
              コメント
            </Button>
          </div>
          
          <Button 
            variant="outline"
            onClick={() => router.push(`/note/edit/${note.id}`)}
            className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            編集
          </Button>
        </div>

        {/* 関連ノート */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">関連ノート</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200 hover:border-indigo-300 rounded-2xl">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                  読書メモ：デザイン思考
                </h4>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                  最近読んだ本のメモです。デザイン思考の重要な概念についてまとめました。
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>by 佐藤花子</span>
                  <span>•</span>
                  <span>8 いいね</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200 hover:border-indigo-300 rounded-2xl">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
                  技術メモ：React 18
                </h4>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                  React 18の新機能についてまとめたメモです。Concurrent Featuresについて詳しく解説。
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>by 鈴木一郎</span>
                  <span>•</span>
                  <span>15 いいね</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteReadClient;
