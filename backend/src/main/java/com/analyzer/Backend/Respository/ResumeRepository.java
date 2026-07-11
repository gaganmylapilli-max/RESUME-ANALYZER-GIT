package com.analyzer.Backend.Respository;

import com.analyzer.Backend.Entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract interface ResumeRepository extends JpaRepository<Resume, Long> {
}
