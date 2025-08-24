"use client";

import React, { useState, useRef } from 'react';

interface Choice {
  id: number;
  text: string;
  votes: number;
}

interface Chapter {
  id: number;
  title: string;
  content: string;
  mediaType: string;
  mediaUrl: string;
  choices: Choice[];
}

interface Story {
  id: number;
  title: string;
  author: string;
  description: string;
  thumbnail: string;
  views: number;
  likes: number;
  chapters: Chapter[];
  status: string;
  tags: string[];
}

interface NewStory {
  title: string;
  description: string;
  chapters: Chapter[];
}

interface NewChapter {
  title: string;
  content: string;
  mediaType: string;
  mediaUrl?: string;
  choices: { text: string; votes: number }[];
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Play, Vote, Users, Share2, Flag, Crown, Image, Video, MessageCircle, Heart, BarChart3, Eye } from 'lucide-react';

const InteractiveStoryBuilder = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "魔法の森の冒険",
      author: "ストーリーマスター",
      description: "古い森で不思議な扉を発見したあなた。その先には...",
      thumbnail: "/api/placeholder/300/200",
      views: 1250,
      likes: 89,
      chapters: [
        {
          id: 1,
          title: "不思議な扉の発見",
          content: "深い森を歩いていると、光る扉を発見しました。",
          mediaType: "image",
          mediaUrl: "/api/placeholder/400/300",
          choices: [
            { id: 1, text: "扉を開ける", votes: 45 },
            { id: 2, text: "周りを調べる", votes: 23 },
            { id: 3, text: "引き返す", votes: 12 }
          ]
        }
      ],
      status: "published",
      tags: ["ファンタジー", "冒険", "選択型"]
    }
  ]);

  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [newStory, setNewStory] = useState<NewStory>({
    title: "",
    description: "",
    chapters: []
  });
  const [newChapter, setNewChapter] = useState<NewChapter>({
    title: "",
    content: "",
    mediaType: "image",
    choices: [{ text: "", votes: 0 }]
  });
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [liveVoting, setLiveVoting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addChoice = () => {
    setNewChapter(prev => ({
      ...prev,
      choices: [...prev.choices, { text: "", votes: 0 }]
    }));
  };

  const updateChoice = (index: number, text: string) => {
    setNewChapter(prev => ({
      ...prev,
      choices: prev.choices.map((choice, i) => 
        i === index ? { ...choice, text } : choice
      )
    }));
  };

  const removeChoice = (index: number) => {
    setNewChapter(prev => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index)
    }));
  };

  const handleVote = (storyId: number, chapterId: number, choiceId: number) => {
    setStories(prev => prev.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          chapters: story.chapters.map(chapter => {
            if (chapter.id === chapterId) {
              return {
                ...chapter,
                choices: chapter.choices.map(choice => 
                  choice.id === choiceId 
                    ? { ...choice, votes: choice.votes + 1 }
                    : choice
                )
              };
            }
            return chapter;
          })
        };
      }
      return story;
    }));
    setSelectedChoice(choiceId);
  };

  const getTotalVotes = (choices: Choice[]) => {
    return choices.reduce((total: number, choice: Choice) => total + choice.votes, 0);
  };

  const getVotePercentage = (votes: number, totalVotes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      setNewChapter(prev => ({
        ...prev,
        mediaType,
        mediaUrl: URL.createObjectURL(file)
      }));
    }
  };

  const publishStory = () => {
    if (newStory.title && newStory.description) {
      const story: Story = {
        id: Date.now(),
        ...newStory,
        author: "あなた",
        views: 0,
        likes: 0,
        status: "published",
        tags: ["新作"],
        thumbnail: "/api/placeholder/300/200"
      };
      setStories(prev => [story, ...prev]);
      setNewStory({ title: "", description: "", chapters: [] });
      setActiveTab("browse");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  インタラクティブストーリー
                </h1>
                <p className="text-sm text-slate-600">あなたの選択で物語が変わる</p>
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
              <Eye className="w-4 h-4" />
              ストーリー一覧
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-600 rounded-xl transition-all">
              <Plus className="w-4 h-4" />
              新規作成
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-600 rounded-xl transition-all">
              <BarChart3 className="w-4 h-4" />
              分析
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Card key={story.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-indigo-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={story.thumbnail} 
                      alt={story.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <Badge className="absolute top-3 right-3 bg-indigo-500/90 backdrop-blur-sm border-0">
                      {story.status === 'published' ? '公開中' : '下書き'}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{story.title}</CardTitle>
                    <p className="text-sm text-slate-600 font-medium">by {story.author}</p>
                    <p className="text-sm text-slate-500 line-clamp-2">{story.description}</p>
                  </CardHeader>
                                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {story.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-pink-500" />
                          {story.likes}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setCurrentStory(story)}
                            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            プレイ
                          </Button>
                        </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{story.title}</DialogTitle>
                        </DialogHeader>
                        {story.chapters.map((chapter) => (
                          <div key={chapter.id} className="space-y-4">
                            <h3 className="text-xl font-semibold">{chapter.title}</h3>
                            <p className="text-gray-700">{chapter.content}</p>
                            
                            {chapter.mediaType === 'image' && (
                              <img 
                                src={chapter.mediaUrl} 
                                alt="Chapter media"
                                className="w-full max-w-md mx-auto rounded-lg"
                              />
                            )}
                            
                            {chapter.mediaType === 'video' && (
                              <video 
                                controls 
                                className="w-full max-w-md mx-auto rounded-lg"
                              >
                                <source src={chapter.mediaUrl} />
                              </video>
                            )}

                            <div className="space-y-3">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Vote className="w-4 h-4" />
                                あなたの選択は？
                                {liveVoting && (
                                  <Badge variant="outline" className="text-green-600 border-green-600">
                                    ライブ投票中
                                  </Badge>
                                )}
                              </h4>
                              {chapter.choices.map((choice) => {
                                const totalVotes = getTotalVotes(chapter.choices);
                                const percentage = getVotePercentage(choice.votes, totalVotes);
                                const isSelected = selectedChoice === choice.id;
                                
                                return (
                                  <div key={choice.id} className="space-y-2">
                                    <Button
                                      variant={isSelected ? "default" : "outline"}
                                      className={`w-full justify-start text-left ${
                                        isSelected ? 'bg-purple-500 hover:bg-purple-600' : ''
                                      }`}
                                      onClick={() => handleVote(story.id, chapter.id, choice.id)}
                                    >
                                      {choice.text}
                                    </Button>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                      <span>{choice.votes} 票</span>
                                      <span>{percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>コンテンツを報告</AlertDialogTitle>
                        <AlertDialogDescription>
                          このコンテンツに不適切な内容が含まれている場合は報告してください。
                          運営チームが内容を確認し、必要に応じて対処いたします。
                        </AlertDialogDescription>
                        <AlertDialogAction>報告する</AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>
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
                あなたの<span className="text-indigo-600">物語</span>を創りましょう
              </h2>
              <p className="text-lg text-slate-600">
                写真と音楽で、思い出を美しいストーリーに変換
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-indigo-600" />
                  </div>
                  新しいストーリーを作成
                </CardTitle>
              </CardHeader>
                              <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">タイトル</label>
                    <Input
                      value={newStory.title}
                      onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="魅力的なタイトルを入力してください"
                      className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">説明</label>
                    <Textarea
                      value={newStory.description}
                      onChange={(e) => setNewStory(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="ストーリーの概要を入力してください"
                      rows={3}
                      className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                    />
                  </div>

                                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700">チャプター作成</label>
                    <Card className="p-6 bg-slate-50/50 border border-slate-200">
                      <div className="space-y-4">
                        <Input
                          value={newChapter.title}
                          onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="チャプタータイトル"
                          className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                        />
                        
                        <Textarea
                          value={newChapter.content}
                          onChange={(e) => setNewChapter(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="チャプターの内容を入力してください"
                          rows={4}
                          className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                        />

                                              <div>
                          <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-all"
                          >
                            <Image className="w-4 h-4" />
                            <Video className="w-4 h-4" />
                            メディアをアップロード
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                          />
                        </div>

                      {newChapter.mediaUrl && (
                        <div className="mt-4">
                          {newChapter.mediaType === 'image' ? (
                            <img 
                              src={newChapter.mediaUrl} 
                              alt="Preview"
                              className="max-w-xs rounded-lg"
                            />
                          ) : (
                            <video 
                              controls 
                              className="max-w-xs rounded-lg"
                            >
                              <source src={newChapter.mediaUrl} />
                            </video>
                          )}
                        </div>
                      )}

                                              <div className="space-y-3">
                          <label className="block text-sm font-semibold text-slate-700">選択肢</label>
                          {newChapter.choices.map((choice, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={choice.text}
                                onChange={(e) => updateChoice(index, e.target.value)}
                                placeholder={`選択肢 ${index + 1}`}
                                className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                              />
                              {newChapter.choices.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeChoice(index)}
                                  className="border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl"
                                >
                                  ×
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button 
                            variant="outline" 
                            onClick={addChoice} 
                            className="w-full border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-all"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            選択肢を追加
                          </Button>
                        </div>
                    </div>
                  </Card>
                </div>

                                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={publishStory}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                      disabled={!newStory.title || !newStory.description}
                    >
                      公開する
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setLiveVoting(!liveVoting)}
                      className={`border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-all ${
                        liveVoting ? 'border-green-500 text-green-600 bg-green-50' : ''
                      }`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {liveVoting ? 'ライブ投票ON' : 'ライブ投票OFF'}
                    </Button>
                  </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  総視聴数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {stories.reduce((total, story) => total + story.views, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-500">先月比 +12%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  総いいね数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pink-600">
                  {stories.reduce((total, story) => total + story.likes, 0)}
                </div>
                <p className="text-sm text-gray-500">先月比 +8%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  アクティブユーザー
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">324</div>
                <p className="text-sm text-gray-500">先月比 +15%</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>人気ストーリーランキング</CardTitle>
            </CardHeader>
            <CardContent>
              {stories
                .sort((a, b) => b.views - a.views)
                .map((story, index) => (
                  <div key={story.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{story.title}</div>
                        <div className="text-sm text-gray-500">by {story.author}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{story.views.toLocaleString()} 視聴</div>
                      <div className="text-sm text-gray-500">{story.likes} いいね</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default InteractiveStoryBuilder;