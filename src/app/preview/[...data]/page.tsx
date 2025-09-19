import PreviewClient from "./preview";

export default async function Page({ params }: { params: { data: string[] } }) {
  const { data } = await params;
  return <PreviewClient data={data} />;
}
