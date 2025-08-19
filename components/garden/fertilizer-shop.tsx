import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, Zap } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Fertilizer, Plant } from "@shared/schema";

interface FertilizerShopProps {
  selectedPlant: Plant | null;
  onClose: () => void;
}

export default function FertilizerShop({ selectedPlant, onClose }: FertilizerShopProps) {
  const { toast } = useToast();
  
  const { data: fertilizers, isLoading } = useQuery<Fertilizer[]>({
    queryKey: ["/api/fertilizers"],
  });

  const { data: user } = useQuery<{ grassPoints: number }>({
    queryKey: ["/api/user"],
  });

  const applyFertilizerMutation = useMutation({
    mutationFn: async ({ plantId, fertilizerId }: { plantId: string; fertilizerId: string }) => {
      return apiRequest({
        url: `/api/plants/${plantId}/fertilize`,
        method: "POST",
        body: { fertilizerId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/plants"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "肥料を適用しました",
        description: "植物の成長が加速します！",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "肥料の適用に失敗しました",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleApplyFertilizer = (fertilizerId: string) => {
    if (!selectedPlant) return;
    applyFertilizerMutation.mutate({ plantId: selectedPlant.id, fertilizerId });
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 text-green-800 border-green-200";
      case "purple": return "bg-purple-100 text-purple-800 border-purple-200";
      case "gold": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!selectedPlant) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            肥料ショップ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-earth-500">植物を選択してください</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>肥料ショップ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if plant already has active fertilizer
  const hasActiveFertilizer = selectedPlant.fertilizerId && selectedPlant.fertilizedAt;
  const fertilizedTime = hasActiveFertilizer && selectedPlant.fertilizedAt ? new Date(selectedPlant.fertilizedAt) : null;

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          肥料ショップ
        </CardTitle>
        <p className="text-sm text-earth-500">
          選択した植物: {selectedPlant.emoji} {selectedPlant.name}
        </p>
        {hasActiveFertilizer && fertilizedTime && (
          <Badge variant="secondary" className="w-fit">
            <Clock className="w-3 h-3 mr-1" />
            肥料効果中
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {fertilizers?.map((fertilizer) => (
          <div key={fertilizer.id} className={`p-4 rounded-lg border-2 ${getColorClass(fertilizer.color)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{fertilizer.emoji}</span>
                <h3 className="font-semibold">{fertilizer.name}</h3>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                +{fertilizer.xpBoostPercent}%
              </Badge>
            </div>
            <p className="text-sm text-earth-600 mb-3">{fertilizer.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-600">{fertilizer.cost} GP</span>
              <Button
                size="sm"
                onClick={() => handleApplyFertilizer(fertilizer.id)}
                disabled={
                  applyFertilizerMutation.isPending ||
                  !user ||
                  user.grassPoints < fertilizer.cost ||
                  hasActiveFertilizer ||
                  selectedPlant.status === "harvested" ||
                  selectedPlant.status === "withered"
                }
                className="bg-garden-green-500 hover:bg-garden-green-600"
              >
                適用
              </Button>
            </div>
            {user && user.grassPoints < fertilizer.cost && (
              <p className="text-xs text-red-500 mt-1">GP不足</p>
            )}
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}