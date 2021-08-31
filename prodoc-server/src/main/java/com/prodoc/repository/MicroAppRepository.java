package com.prodoc.repository;

import com.prodoc.models.MicroApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MicroAppRepository extends JpaRepository<MicroApp,Integer> {


}
