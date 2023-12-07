import dynamic from "next/dynamic";
import {
  viewerComponent,
  viewerOptions,
  type ViewerOptions,
} from "@/viewerConfig";
import { type CustomDisplay } from "@samvera/clover-iiif";

const Viewer = dynamic(
  () =>
    import("@samvera/clover-iiif").then((Clover) => {
      return Clover.Viewer;
    }),
  {
    ssr: false,
  }
);

let pdfManifests = [
  { manifestUrl: "http://localhost:3000/manifests/pdf.json", target: "item1" },
  {
    manifestUrl:
      "https://seagate.whirl-i-gig.com/admin/service/IIIF/manifest/ca_objects:170",
    target:
      "https://seagate.whirl-i-gig.com/admin/service/IIIF/manifest/ca_objects:170-255",
  },
];
let pdfManifest = pdfManifests[1];

let apiData = {
  manifestUrl: pdfManifest.manifestUrl,
  customViewers: [
    {
      itemId: pdfManifest.target,
      viewer: "pdf",
    },
  ],
};

let customDisplays = apiData.customViewers
  .filter((viewer) => {
    return viewerComponent[viewer.viewer as keyof ViewerOptions] !== undefined;
  })
  .map((viewer) => {
    let data = {
      target: viewer.itemId,
      component: viewerComponent[viewer.viewer as keyof ViewerOptions],
    } as CustomDisplay;
    if (viewerOptions[viewer.viewer as keyof ViewerOptions]) {
      data.options = viewerOptions[viewer.viewer as keyof ViewerOptions];
    }
    return data;
  });


export default function Home() {
  return (
    <>
      <Viewer
        iiifContent={apiData.manifestUrl}
        options={{ informationPanel: { renderAbout: true } }}
        customDisplays={customDisplays}
      />
      ;
    </>
  );
}
