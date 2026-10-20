package com.example.certificates;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CertificateController {

    @GetMapping("/verify/{id}")
    public String verify(@PathVariable("id") String id, Model model) {
        model.addAttribute("searchedId", id);
        return "verify";
    }

    @GetMapping(value = "/verify/{id}/certificate.pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<org.springframework.core.io.Resource> certificatePdf(
            @PathVariable("id") String id) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .contentType(MediaType.APPLICATION_PDF)
                .body(new ClassPathResource("static/original.pdf"));
    }

    @GetMapping(value = "/original.png", produces = MediaType.IMAGE_PNG_VALUE)
    @ResponseBody
    public ResponseEntity<org.springframework.core.io.Resource> certificateImage() {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .contentType(MediaType.IMAGE_PNG)
                .body(new ClassPathResource("static/original.png"));
    }
}
