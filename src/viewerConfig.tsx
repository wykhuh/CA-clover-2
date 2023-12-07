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
