import SurveyAnswerClient from '@/components/survey/survey-answer-client';

// 静的パラメータを生成（実際に使用されるIDを返す）
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' }
  ];
}

const SurveyAnswerPage = ({ params }: { params: { id: string } }) => {
  return <SurveyAnswerClient surveyId={params.id} />;
};

export default SurveyAnswerPage;
