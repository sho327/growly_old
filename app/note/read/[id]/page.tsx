import NoteReadClient from '@/components/note/note-read-client';

// 静的パラメータを生成（実際に使用されるIDを返す）
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' }
  ];
}

const NoteReadPage = ({ params }: { params: { id: string } }) => {
  return <NoteReadClient noteId={params.id} />;
};

export default NoteReadPage;