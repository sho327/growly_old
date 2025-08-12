"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, X } from "lucide-react"

interface Team {
  name: string
  members: string[]
}

interface TeamSelectorProps {
  teams: Team[]
  selectedTeam: string
  onTeamChange: (teamName: string) => void
  onTeamsChange: (teams: Team[]) => void
}

export function TeamSelector({ 
  teams, 
  selectedTeam, 
  onTeamChange, 
  onTeamsChange 
}: TeamSelectorProps) {
  const [openAddTeam, setOpenAddTeam] = useState(false)
  const [openEditTeam, setOpenEditTeam] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [editTeamName, setEditTeamName] = useState("")
  const [editMembers, setEditMembers] = useState<string[]>([])
  const [newMember, setNewMember] = useState("")

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      const newTeam = { name: newTeamName.trim(), members: [] }
      onTeamsChange([...teams, newTeam])
      onTeamChange(newTeam.name)
      setNewTeamName("")
      setOpenAddTeam(false)
    }
  }

  const handleOpenEdit = () => {
    const team = teams.find((t) => t.name === selectedTeam)
    if (team) {
      setEditTeamName(team.name)
      setEditMembers(team.members)
      setOpenEditTeam(true)
    }
  }

  const handleSaveEdit = () => {
    const updatedTeams = teams.map((t) =>
      t.name === selectedTeam
        ? { ...t, name: editTeamName, members: editMembers }
        : t
    )
    onTeamsChange(updatedTeams)
    onTeamChange(editTeamName)
    setOpenEditTeam(false)
  }

  const handleAddMember = () => {
    if (newMember.trim()) {
      setEditMembers((prev) => [...prev, newMember.trim()])
      setNewMember("")
    }
  }

  const handleRemoveMember = (member: string) => {
    setEditMembers((prev) => prev.filter((m) => m !== member))
  }

  return (
    <div className="px-4 pt-4">
      <Select value={selectedTeam} onValueChange={onTeamChange}>
        <SelectTrigger className="w-full h-10 rounded-md px-2 flex items-center">
          <SelectValue placeholder="チームを選択" className="truncate" />
        </SelectTrigger>

        <SelectContent className="w-full p-0">
          <div className="py-1">
            {teams.map((team) => (
              <SelectItem
                key={team.name}
                value={team.name}
                className={
                  "h-10 flex items-center px-3 rounded-md " +
                  "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700 data-[highlighted]:bg-gray-100"
                }
              >
                <span className="ml-0">{team.name}</span>
              </SelectItem>
            ))}

            <div className="px-2 py-1 border-t mt-1 space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-10"
                onClick={() => setOpenAddTeam(true)}
              >
                <Plus className="mr-3 h-4 w-4" />
                新しいチームを追加
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-10"
                onClick={handleOpenEdit}
              >
                チームを編集
              </Button>
            </div>
          </div>
        </SelectContent>
      </Select>

      {/* チーム追加モーダル */}
      <Dialog open={openAddTeam} onOpenChange={setOpenAddTeam}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新しいチームを追加</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="チーム名"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddTeam(false)}>
              キャンセル
            </Button>
            <Button onClick={handleAddTeam}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* チーム編集モーダル */}
      <Dialog open={openEditTeam} onOpenChange={setOpenEditTeam}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>チームを編集</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="チーム名"
              value={editTeamName}
              onChange={(e) => setEditTeamName(e.target.value)}
            />
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="メンバー名"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
                <Button onClick={handleAddMember}>追加</Button>
              </div>
              <div className="space-y-1">
                {editMembers.map((member) => (
                  <div key={member} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{member}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditTeam(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSaveEdit}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
