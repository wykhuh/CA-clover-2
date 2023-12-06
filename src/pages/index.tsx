import dynamic from "next/dynamic";
import PdfViewer from "@/components/PdfViewer/PdfViewer";
// import PdfViewer from "@/components/pdfviewer";

const Viewer = dynamic(
  () =>
    import("@samvera/clover-iiif").then((Clover) => {
      return Clover.Viewer;
    }),
  {
    ssr: false,
  }
);

let manifests = [
  { manifestUrl: "http://localhost:3000/pdf.json", target: "item1" },
  {
    manifestUrl:
      "https://seagate.whirl-i-gig.com/admin/service/IIIF/manifest/ca_objects:170",
    target:
      "https://seagate.whirl-i-gig.com/admin/service/IIIF/manifest/ca_objects:170-255",
  },
];
let manifest = manifests[1];

let apiData = {
  manifestUrl: manifest.manifestUrl,
  customViewers: [
    {
      itemId: manifest.target,
      viewer: "pdf",
    },
  ],
};

export default function Home() {
  let viewerOptions = {
    showPdfToolBar: true,
    showPdfZoom: true,
    showPdfRotate: true,
    showPdfFullScreen: true,
    showPdfPaging: true,
    showPdfThumbnails: true,
    showPdfTwoPageSpread: true,
    showOCROverlays: true,
  };

  return (
    <>
      <Viewer
        iiifContent={apiData.manifestUrl}
        options={{ informationPanel: { renderAbout: true } }}
        customDisplays={[
          {
            target: manifest.target,
            component: PdfViewer,
            options: viewerOptions,
          },
        ]}
      />
      ;
    </>
  );
}
