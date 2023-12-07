import dynamic from "next/dynamic";
import { formatCustomDisplays, type APIData } from "@/viewerConfig";

const Viewer = dynamic(
  () =>
    import("@samvera/clover-iiif").then((Clover) => {
      return Clover.Viewer;
    }),
  {
    ssr: false,
  }
);

let apiData: APIData = {
  manifestUrl:
    "https://seagate.whirl-i-gig.com/admin/service/IIIF/manifest/ca_objects:170",
  customViewers: [
    {
      itemId:
        "https://seagate.whirl-i-gig.com/admin/service/IIIF/manifest/ca_objects:170-255",
      viewerType: "pdf",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Viewer
        iiifContent={apiData.manifestUrl}
        customDisplays={formatCustomDisplays(apiData)}
      />
      ;
    </>
  );
}
