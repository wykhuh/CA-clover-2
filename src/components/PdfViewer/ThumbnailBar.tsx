import React from "react";
import { Document, Page } from "react-pdf";
import VisibilitySensor from "react-visibility-sensor";

import { useViewerState, useViewerDispatch } from "@/context/pdf-viewer-context";
import {
  ThumbnailContainer,
  ThumbnailList,
} from "@/components/PdfViewer/ThumbnailBar.styled";

type VisibilityType = {
  isVisible: boolean;
};

const ThumbnailBar = (props: any) => {
  const { configOptions } = useViewerState();
  let { pdfNumPages, pdfPage, showPdfThumbnails, pdfToggleThumbnails } =
    configOptions;
  const dispatch: any = useViewerDispatch();
  if (pdfNumPages === undefined) {
    pdfNumPages = 1;
  }

  let defaultPage = (
    <div
      style={{ width: "100%", height: "200px", backgroundColor: "#fff" }}
    ></div>
  );

  let thumbnails = [];
  for (let i = 1; i <= pdfNumPages; i++) {
    thumbnails.push({
      page_num: i,
      doc: (
        <Document file={props.url} loading={defaultPage}>
          <Page
            pageNumber={i}
            height={200}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      ),
    });
  }

  const scrollToPage = (page_num: number) => {
    const element = document.getElementById("page-" + `${page_num}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  const changePage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    page: number,
  ) => {
    dispatch({
      type: "updateConfigOptions",
      configOptions: {
        ...configOptions,
        pdfPage: page,
        pdfEnteredPage: page,
      },
    });
    scrollToPage(page);
    e.preventDefault();
  };

  if (showPdfThumbnails && pdfToggleThumbnails) {
    return (
      <ThumbnailList style={{ height: props.height, overflow: "scroll" }}>
        {thumbnails
          ? thumbnails.map((thumbnail, index) => {
              return (
                <ThumbnailContainer
                  id={"thumbnail-" + `${thumbnail.page_num}`}
                  key={index}
                >
                  <div
                    className={`${
                      pdfPage == thumbnail.page_num && "current-page"
                    }`}
                    onClick={(e) => changePage(e, thumbnail.page_num)}
                    style={{ cursor: "pointer" }}
                  >
                    <VisibilitySensor>
                      {({ isVisible }: VisibilityType) => (
                        <div>{isVisible ? thumbnail.doc : defaultPage}</div>
                      )}
                    </VisibilitySensor>
                  </div>
                  <p className="label">Page {thumbnail.page_num}</p>
                </ThumbnailContainer>
              );
            })
          : null}
      </ThumbnailList>
    );
  } else {
    return null;
  }
};

export default ThumbnailBar;
