import dynamic from "next/dynamic";
import PdfViewer from "@/components/pdfviewer";

const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((Clover) => {  return Clover.Viewer }),
  {
    ssr: false,
  },
);


export default function Home() {
    let apiData = {
    manifestUrl: "http://localhost:3000/pdf.json",
    customViewers: [
      {
        itemId:  "item1",
        viewer: "pdf",
      }
    ],
    };

  return <>
    <Viewer
      iiifContent={apiData.manifestUrl}
      options={{ informationPanel: { renderAbout: true } }}
      customDisplays={[
        {target: 'item1', component: PdfViewer}
      ]}
    />;
  </>
}
