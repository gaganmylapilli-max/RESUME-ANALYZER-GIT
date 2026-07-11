package com.analyzer.Backend.Service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.aot.AotServices;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
@Service
public class ParserService {
    public String extractText(MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.toLowerCase().endsWith(".pdf")) {
            return extractFromPdf(file.getInputStream());
        } else if (fileName != null && (fileName.toLowerCase().endsWith(".docx") || fileName.toLowerCase().endsWith(".doc"))) {
            return extractFromDocx(file.getInputStream());
        }
        throw new IllegalArgumentException("Unsupported file type. Only PDF and DOCX are allowed.");
    }
    private String extractFromPdf(InputStream is) throws Exception {
        try (PDDocument document = Loader.loadPDF(is.readAllBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
    private String extractFromDocx(InputStream is) throws Exception {
        try (XWPFDocument document = new XWPFDocument(is);
             XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
            return extractor.getText();
        }
    }
}
