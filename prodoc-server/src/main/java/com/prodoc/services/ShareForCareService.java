package com.prodoc.services;

import com.prodoc.models.Patient;
import com.prodoc.models.PatientReferral;
import com.prodoc.repository.PatientRepository;
import com.prodoc.payload.response.Response;
import com.prodoc.utility.UniqueString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ShareForCareService {

    @Autowired
    PatientRepository patientRepo;

   public Object registerPatient(Patient patient){
       patient.setQrCode(UniqueString.uniqueString());
       try {
           Patient exist = patientRepo.findByPhone(patient.getPhone());
           if(exist!=null){
               return  new Response("error","User Already exist",exist);
           }else {
               Patient patientData = patientRepo.save(patient);
               return patientData;
           }
       }catch (Exception e){
           return  new Response("error",e.getMessage());
       }

    }

    public Object getPatienByQRCode(String qrCode){
        Patient patientData = patientRepo.findByQrCode(qrCode);
        if(patientData==null){
            return new Response("error","No Record Found");
        }else{
            return patientData;
        }
    }

    public Object claimPatientReferral(PatientReferral referral){
       Patient patient = patientRepo.findByQrCode(referral.getQrCodeClaimed());
       if(patient!=null) {
           if (!isReferralClaimed(patient.getReferred(), referral.getPhone())) {
               Set<PatientReferral> referred = new HashSet<>();
               if (patient.getReferred() != null) {
                   referred = patient.getReferred();
               }
               referred.add(referral);
               patient.setReferred(referred);
               Patient ref = patientRepo.save(patient);
           if (ref != null) {
               return new Response("success", "Referral claimed!");
           } else {
               return new Response("error", "Something went wrong, please report to IT");
           }
           }else{
                   return new Response("Info", "Already claimed!");
               }
           }else{
               return  new Response("error","No Record Found");
           }
    }

    boolean isReferralClaimed(Set<PatientReferral> referrals,String phone){
       for(PatientReferral refData:referrals){
           if(refData.getPhone()!=null){
               if(refData.getPhone().equalsIgnoreCase(phone)){
                   return true;
               }
           }
        }
       return false;
    }
    public List<Patient> getRecentReggistered(){
        return patientRepo.findAll();
    }

}
