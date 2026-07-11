package com.analyzer.Backend.Service;

import com.analyzer.Backend.Entity.AnalysisResult;
import com.analyzer.Backend.Entity.JobDescription;
import com.analyzer.Backend.Entity.Resume;
import com.analyzer.Backend.Respository.AnalysisResultRepository;
import com.analyzer.Backend.Respository.JobDescriptionRepository;
import com.analyzer.Backend.Respository.ResumeRepository;
import jakarta.validation.constraints.Null;
import org.hibernate.jdbc.Expectation;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import javax.print.attribute.standard.JobName;
import java.util.List;

@Service
public class ResumeService {
    private final AnalysisResultRepository analysisResultRepository;
    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final ParserService parserService;
    private final GeminiAiService geminiAiService;
    private final ObjectMapper objectMapper;

    //Constructor
    public ResumeService(AnalysisResultRepository resultRepo, ResumeRepository resumeRepo,
                        JobDescriptionRepository jobDesRepo, ParserService parseServi,
                         GeminiAiService gemini, ObjectMapper objMap){
        this.analysisResultRepository = resultRepo;
        this.resumeRepository = resumeRepo;
        this.jobDescriptionRepository = jobDesRepo;
        this.parserService = parseServi;
        this.geminiAiService = gemini;
        this.objectMapper = objMap;
    }


    //Main Method
    public AnalysisResult analyze(MultipartFile file, String jobDescription){

        //Parsing the file (Usually fetches the Text that is present in teh PDF/ Docx
        try{
            String parsedText = parserService.extractText(file);
        }
        catch(Exception e){
            e.printStackTrace();
        }

        //Save the Resume
        Resume resume= new Resume();
        String parsedText = resume.getParsedText();
        if(!StringUtils.isEmpty(parsedText)){
            resume.setParsedText(parsedText);
        }
        if(!StringUtils.isEmpty(file.getOriginalFilename())){
            resume.setFileName(file.getOriginalFilename());
        }
        resumeRepository.save(resume);

        //Save the JobDescription
        JobDescription jDes = new JobDescription();
        if(!StringUtils.isEmpty(jobDescription)){
            jDes.setDescriptionText(jobDescription);
        }
        jobDescriptionRepository.save(jDes);

        //Call AI (Returns Json as a response which later needs to be converted to the Java object)
        String aiResponse = geminiAiService.analyseResume(parsedText, jobDescription);
        System.out.println("The Raw Response from the AI "+ aiResponse);

        //Build Result
        AnalysisResult result = new AnalysisResult();
        result.setResume(resume);
        result.setJobDescription(jDes);

        JsonNode rootNode = objectMapper.readTree(aiResponse);
        try {
            if (rootNode.get("atsscore") != null) {
                result.setAtsScore(rootNode.get("atsScore").asInt());
            }
            if (StringUtils.isEmpty(rootNode.get("missingSkills"))) {
                result.setMissingSkills(rootNode.get("missingSkills").asText());
            }
            if (StringUtils.isEmpty(rootNode.get("rewrittenResume"))) {
                result.setReWrittenResume(rootNode.get("rewrittenResume").asText());
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return analysisResultRepository.save(result);
    }

    public List<AnalysisResult> getHistory(){
        return analysisResultRepository.findAll();
    }
}
