"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Image, 
  FileText, 
  Search, 
  Heart, 
  Share2, 
  Bookmark, 
  Edit3, 
  Trash2, 
  Download,
  Calendar,
  User,
  Tag,
  Eye,
  MessageCircle,
  Sparkles,
  Wand2,
  Palette,
  Camera,
  Upload
} from 'lucide-react';

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

const NoteApp = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
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

**次回の会議で共有しよう。**`,
      author: '田中太郎',
      createdAt: '2025-01-20',
      updatedAt: '2025-01-20',
      tags: ['アイデア', 'プロジェクト', 'デザイン'],
      likes: 12,
      views: 45,
      isPublic: true,
      images: []
    },
    {
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
  ]);

  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    isPublic: true
  });
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => note.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewNote(prev => ({
        ...prev,
        content: prev.content + `\n![${file.name}](${imageUrl})\n`
      }));
    }
  };

  const insertMarkdown = (markdown: string) => {
    setNewNote(prev => ({
      ...prev,
      content: prev.content + markdown
    }));
  };

  const addTag = (tag: string) => {
    if (!newNote.tags.includes(tag)) {
      setNewNote(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const saveNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        ...newNote,
        author: 'あなた',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        likes: 0,
        views: 0,
        images: []
      };
      setNotes(prev => [note, ...prev]);
      setNewNote({ title: '', content: '', tags: [], isPublic: true });
      setActiveTab('browse');
    }
  };

  const toggleLike = (noteId: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, likes: note.likes + 1 } : note
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                  ノートスクラップ
                </h1>
                <p className="text-sm text-slate-600">アイデアを自由に書き留めよう</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                ログイン
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                無料で始める
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/60 backdrop-blur-sm p-1 rounded-2xl shadow-sm">
            <TabsTrigger value="browse" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-600 rounded-xl transition-all">
              <Search className="w-4 h-4" />
              ノート一覧
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-600 rounded-xl transition-all">
              <Plus className="w-4 h-4" />
              新規作成
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-600 rounded-xl transition-all">
              <Bookmark className="w-4 h-4" />
              お気に入り
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            {/* 検索とフィルター */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="ノートを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedTags.includes(tag) 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600'
                    }`}
                    onClick={() => setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* ノート一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-indigo-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {note.title}
                      </CardTitle>
                      <Badge variant={note.isPublic ? "default" : "outline"} className="text-xs">
                        {note.isPublic ? '公開' : '非公開'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <User className="w-4 h-4" />
                      <span>{note.author}</span>
                      <Calendar className="w-4 h-4 ml-2" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="prose prose-sm max-w-none mb-4">
                      <div className="text-slate-600 line-clamp-3" 
                           dangerouslySetInnerHTML={{ 
                             __html: note.content
                               .replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-slate-800">$1</h1>')
                               .replace(/^## (.*$)/gim, '<h2 class="text-base font-semibold text-slate-800">$1</h2>')
                               .replace(/^### (.*$)/gim, '<h3 class="text-sm font-medium text-slate-800">$1</h3>')
                               .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                               .replace(/\*(.*?)\*/g, '<em>$1</em>')
                               .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 rounded">$1</code>')
                               .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-200 pl-4 italic">$1</blockquote>')
                               .replace(/^- (.*$)/gim, '<li>$1</li>')
                               .replace(/\n/g, '<br>')
                           }} 
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {note.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-pink-500" />
                          {note.likes}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setCurrentNote(note)}
                            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            読む
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-slate-800">{note.title}</DialogTitle>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span>by {note.author}</span>
                              <span>{formatDate(note.createdAt)}</span>
                            </div>
                          </DialogHeader>
                          <div className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ 
                              __html: note.content
                                .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-slate-800 mb-4">$1</h1>')
                                .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-slate-800 mb-3">$1</h2>')
                                .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium text-slate-800 mb-2">$1</h3>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-2 py-1 rounded">$1</code>')
                                .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-200 pl-4 italic bg-slate-50 py-2">$1</blockquote>')
                                .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
                                .replace(/\n/g, '<br>')
                            }} />
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => toggleLike(note.id)}
                        className="border-slate-200 hover:border-pink-300 hover:bg-pink-50 text-slate-600 hover:text-pink-600 rounded-xl"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      
                      <Button variant="outline" size="icon" className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* ヒーローセクション */}
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  新しい<span className="text-indigo-600">ノート</span>を作成
                </h2>
                <p className="text-lg text-slate-600">
                  マークダウンで自由にアイデアを書き留めよう
                </p>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Edit3 className="w-5 h-5 text-indigo-600" />
                    </div>
                    ノートを作成
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">タイトル</label>
                    <Input
                      value={newNote.title}
                      onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="ノートのタイトルを入力してください"
                      className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                    />
                  </div>

                  {/* マークダウンツールバー */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('# ')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        H1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('## ')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        H2
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('### ')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        H3
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('**太字**')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        B
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('*斜体*')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        I
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('`コード`')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('> 引用')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        引用
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => insertMarkdown('- リスト')}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        リスト
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">内容</label>
                      <Textarea
                        value={newNote.content}
                        onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="マークダウンでノートの内容を入力してください..."
                        rows={12}
                        className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* タグ */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">タグ</label>
                    <div className="flex flex-wrap gap-2">
                      {newNote.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-indigo-800"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['アイデア', 'メモ', 'プロジェクト', 'デザイン', '技術', '読書'].map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className={`cursor-pointer transition-all ${
                            newNote.tags.includes(tag)
                              ? 'bg-indigo-500 text-white'
                              : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600'
                          }`}
                          onClick={() => addTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 公開設定 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">公開設定</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={newNote.isPublic}
                          onChange={() => setNewNote(prev => ({ ...prev, isPublic: true }))}
                          className="text-indigo-600"
                        />
                        <span className="text-sm text-slate-600">公開</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={!newNote.isPublic}
                          onChange={() => setNewNote(prev => ({ ...prev, isPublic: false }))}
                          className="text-indigo-600"
                        />
                        <span className="text-sm text-slate-600">非公開</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={saveNote}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                      disabled={!newNote.title || !newNote.content}
                    >
                      保存する
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-all"
                    >
                      下書き保存
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">お気に入りのノート</h3>
              <p className="text-slate-500">まだお気に入りのノートはありません</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NoteApp;
