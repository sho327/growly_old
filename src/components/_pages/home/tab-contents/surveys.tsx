"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, BarChart3, Users, Clock, Star, Trash2 } from "lucide-react"
import type { Survey, SurveyQuestion } from "@/lib/types/survey"
import type { User } from "@/lib/types/user"

interface SurveysProps {
  surveys: Survey[]
  user: User
  projectId?: string
  onCreateSurvey: (survey: Omit<Survey, "id" | "responses">) => void
  onSubmitResponse: (surveyId: string, answers: { [questionId: string]: string | number }) => void
}

export function Surveys({ surveys, user, projectId, onCreateSurvey, onSubmitResponse }: SurveysProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const [isResponseOpen, setIsResponseOpen] = useState(false)
  const [newSurvey, setNewSurvey] = useState({
    title: "",
    description: "",
    questions: [] as SurveyQuestion[],
    expiresAt: "",
  })
  const [responses, setResponses] = useState<{ [questionId: string]: string | number }>({})

  const addQuestion = () => {
    const newQuestion: SurveyQuestion = {
      id: Date.now().toString(),
      type: "text",
      question: "",
      required: false,
    }
    setNewSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const updateQuestion = (questionId: string, updates: Partial<SurveyQuestion>) => {
    setNewSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q)),
    }))
  }

  const removeQuestion = (questionId: string) => {
    setNewSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }))
  }

  const handleCreateSurvey = () => {
    if (newSurvey.title && newSurvey.questions.length > 0) {
      onCreateSurvey({
        title: newSurvey.title,
        description: newSurvey.description,
        questions: newSurvey.questions,
        projectId: projectId || "1", // プロジェクトIDを動的に設定
        createdBy: user.id,
        createdAt: new Date(),
        expiresAt: newSurvey.expiresAt ? new Date(newSurvey.expiresAt) : undefined,
      })
      setNewSurvey({ title: "", description: "", questions: [], expiresAt: "" })
      setIsCreateOpen(false)
    }
  }

  const handleSubmitResponse = () => {
    if (selectedSurvey) {
      onSubmitResponse(selectedSurvey.id, responses)
      setResponses({})
      setIsResponseOpen(false)
      setSelectedSurvey(null)
    }
  }

  const hasUserResponded = (survey: Survey) => {
    return survey.responses.some((response) => response.userId === user.id)
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "text":
        return "テキスト"
      case "choice":
        return "選択肢"
      case "rating":
        return "評価"
      case "yesno":
        return "はい/いいえ"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">アンケート</h2>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              アンケート作成
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>新しいアンケートを作成</DialogTitle>
              <DialogDescription>チームメンバーに向けたアンケートを作成します。</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">タイトル</Label>
                  <Input
                    id="title"
                    value={newSurvey.title}
                    onChange={(e) => setNewSurvey((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="アンケートのタイトル"
                  />
                </div>

                <div>
                  <Label htmlFor="description">説明</Label>
                  <Textarea
                    id="description"
                    value={newSurvey.description}
                    onChange={(e) => setNewSurvey((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="アンケートの目的や説明"
                  />
                </div>

                <div>
                  <Label htmlFor="expires">回答期限（任意）</Label>
                  <Input
                    id="expires"
                    type="datetime-local"
                    value={newSurvey.expiresAt}
                    onChange={(e) => setNewSurvey((prev) => ({ ...prev, expiresAt: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">質問</Label>
                  <Button onClick={addQuestion} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    質問追加
                  </Button>
                </div>

                {newSurvey.questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">質問 {index + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>質問内容</Label>
                        <Input
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                          placeholder="質問を入力してください"
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Label>回答形式</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value: any) => updateQuestion(question.id, { type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">テキスト入力</SelectItem>
                              <SelectItem value="choice">選択肢</SelectItem>
                              <SelectItem value="rating">5段階評価</SelectItem>
                              <SelectItem value="yesno">はい/いいえ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2 pt-6">
                          <Checkbox
                            id={`required-${question.id}`}
                            checked={question.required}
                            onCheckedChange={(checked) => updateQuestion(question.id, { required: !!checked })}
                          />
                          <Label htmlFor={`required-${question.id}`} className="text-sm">
                            必須
                          </Label>
                        </div>
                      </div>

                      {question.type === "choice" && (
                        <div>
                          <Label>選択肢（改行区切り）</Label>
                          <Textarea
                            value={question.options?.join("\n") || ""}
                            onChange={(e) =>
                              updateQuestion(question.id, {
                                options: e.target.value.split("\n").filter((opt) => opt.trim()),
                              })
                            }
                            placeholder="選択肢1&#10;選択肢2&#10;選択肢3"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleCreateSurvey} disabled={!newSurvey.title || newSurvey.questions.length === 0}>
                アンケートを作成
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* アンケート一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {surveys.map((survey) => {
          const hasResponded = hasUserResponded(survey)
          const isExpired = survey.expiresAt && survey.expiresAt < new Date()

          return (
            <Card key={survey.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{survey.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{survey.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {hasResponded && (
                      <Badge variant="outline" className="text-green-600">
                        回答済み
                      </Badge>
                    )}
                    {isExpired && (
                      <Badge variant="outline" className="text-red-600">
                        期限切れ
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{survey.responses.length}件の回答</span>
                  </div>
                  {survey.expiresAt && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>期限: {survey.expiresAt.toLocaleDateString("ja-JP")}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {!hasResponded && !isExpired && (
                    <Button
                      onClick={() => {
                        setSelectedSurvey(survey)
                        setIsResponseOpen(true)
                      }}
                      className="flex-1"
                    >
                      回答する
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => {
                      // 結果表示の実装
                    }}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    結果
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {surveys.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">アンケートがありません</h3>
            <p className="text-muted-foreground mb-4">チームメンバーの意見を聞くためのアンケートを作成しましょう。</p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              最初のアンケートを作成
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 回答ダイアログ */}
      <Dialog open={isResponseOpen} onOpenChange={setIsResponseOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSurvey?.title}</DialogTitle>
            <DialogDescription>{selectedSurvey?.description}</DialogDescription>
          </DialogHeader>

          {selectedSurvey && (
            <div className="space-y-6">
              {selectedSurvey.questions.map((question) => (
                <div key={question.id} className="space-y-3">
                  <Label className="text-base font-medium">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>

                  {question.type === "text" && (
                    <Textarea
                      value={(responses[question.id] as string) || ""}
                      onChange={(e) =>
                        setResponses((prev) => ({
                          ...prev,
                          [question.id]: e.target.value,
                        }))
                      }
                      placeholder="回答を入力してください"
                    />
                  )}

                  {question.type === "choice" && question.options && (
                    <RadioGroup
                      value={(responses[question.id] as string) || ""}
                      onValueChange={(value) =>
                        setResponses((prev) => ({
                          ...prev,
                          [question.id]: value,
                        }))
                      }
                    >
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                          <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {question.type === "rating" && (
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          variant={responses[question.id] === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setResponses((prev) => ({
                              ...prev,
                              [question.id]: rating,
                            }))
                          }
                        >
                          <Star className="h-4 w-4 mr-1" />
                          {rating}
                        </Button>
                      ))}
                    </div>
                  )}

                  {question.type === "yesno" && (
                    <RadioGroup
                      value={(responses[question.id] as string) || ""}
                      onValueChange={(value) =>
                        setResponses((prev) => ({
                          ...prev,
                          [question.id]: value,
                        }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                        <Label htmlFor={`${question.id}-yes`}>はい</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${question.id}-no`} />
                        <Label htmlFor={`${question.id}-no`}>いいえ</Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>
              ))}
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleSubmitResponse}>回答を送信</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
