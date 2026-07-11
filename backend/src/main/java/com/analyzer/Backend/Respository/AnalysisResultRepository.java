package com.analyzer.Backend.Respository;

import com.analyzer.Backend.Entity.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public abstract interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {
}
