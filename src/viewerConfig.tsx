import { type CustomDisplay } from "@samvera/clover-iiif";

import PdfViewer from "@/components/PdfViewer/PdfViewer";

export type ViewerOptions = {
  pdf: { [k: string]: boolean };
};

export const viewerOptions: ViewerOptions = {
  pdf: {
    showPdfToolBar: true,
    showPdfZoom: true,
    showPdfRotate: true,
    showPdfFullScreen: true,
    showPdfPaging: true,
    showPdfThumbnails: true,
    showPdfTwoPageSpread: true,
    showOCROverlays: true,
  },
};

export type ViewerComponent = {
  pdf: React.ElementType;
};

export const viewerComponent: ViewerComponent = {
  pdf: PdfViewer,
};

export type APIData = {
  manifestUrl: string;
  customViewers: { itemId: string; viewerType: string }[];
};

export function formatCustomDisplays(apiData: APIData) {
  return apiData.customViewers
    .filter((viewer) => {
      return (
        viewerComponent[viewer.viewerType as keyof ViewerOptions] !== undefined
      );
    })
    .map((viewer) => {
      let viewerType = viewer.viewerType as keyof ViewerOptions;
      let data = {
        target: viewer.itemId,
        component: viewerComponent[viewerType],
      } as CustomDisplay;

      if (viewerOptions[viewerType]) {
        data.options = viewerOptions[viewerType];
      }

      return data;
    });
}
