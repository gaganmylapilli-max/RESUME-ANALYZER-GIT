package com.analyzer.Backend.Service;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class GeminiAiService {

    @Value("$gemini.api.key")
    private String  apiKey;

    @Value("$gemini.api.url")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public GeminiAiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String analyseResume(String parsedText, String jd){
        String prompt = "You are an expert ATS (Applicant Tracking System) Analyzer. " +
                "Evaluate the following resume against the job description.\n\n" +
                "Resume:\n" + parsedText + "\n\n" +
                "Job Description:\n" + jd + "\n\n" +
                "Provide the result STRCITLY as a JSON object (no markdown, no backticks):\n" +
                "{\n  \"atsScore\": 85,\n  \"missingSkills\": \"Java, Docker\",\n  \"rewrittenResume\": \"Rewritten points\"\n}";
        Map<String, Object> requestBody = new HashMap();
        requestBody.put("contents", List.of(
                Map.of("parts", List.of(
                        Map.of("text", prompt)))));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        String urlWithKey = apiUrl+"?key="+apiKey;

        try{
//            Map response = restTemplate.postForObject(urlWithKey,entity, Map.class);
//            if(response!= null){
//                List<Map<String, Object>> candidates = (List<Map<String, Object>>)
//                        response.get("candidates");
//                if(candidates!=null && !candidates.isEmpty()){
//                    Map<String, Object> content = (Map<String, Object>)
//                                                candidates.get(0).
//                                                        get("content");
//                    if(content!=null && !content.isEmpty()){
//                        List<Map<String, Object>> parts = (List<Map<String, Object>>)
//                                content.get("parts");
//                        String rawText = (String) parts.get(0).get("text");
//                        return rawText.replaceAll("```json", "")
//                                .replaceAll("```","")
//                                .trim();
//                    }
//                }
//            }
            return "{\"atsScore\": 0, \"missingSkills\": \"\", \"rewrittenResume\": \"Error analyzing\"}";
        }
        catch(Exception e){
            e.printStackTrace();
            return "{\"atsScore\": 0, \"missingSkills\": \"\", \"rewrittenResume\": \"Error calling Gemini API\"}";
        }
    }
}
