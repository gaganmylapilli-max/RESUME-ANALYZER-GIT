package com.analyzer.Backend.controller;

import com.analyzer.Backend.Entity.AnalysisResult;
import com.analyzer.Backend.Service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.PrintStream;
import java.util.List;

@RestController
@RequestMapping("/api/analyzer")
public class AnalyzerController {
    private final ResumeService resumeService;

    public AnalyzerController(ResumeService resumeService){
        this.resumeService = resumeService;
    }
    @PostMapping("/upload")
    public ResponseEntity<AnalysisResult> uploadAnalyze(
            @RequestParam MultipartFile file,
            @RequestParam String jobDescription){
        try{
            AnalysisResult result = resumeService.analyze(file, jobDescription);
            return ResponseEntity.ok(result);
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<AnalysisResult>> getHistory(){
        return ResponseEntity.ok(resumeService.getHistory());
    }

}
