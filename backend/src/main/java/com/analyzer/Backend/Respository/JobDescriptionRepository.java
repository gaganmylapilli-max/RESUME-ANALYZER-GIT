package com.analyzer.Backend.Respository;

import com.analyzer.Backend.Entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {
}
