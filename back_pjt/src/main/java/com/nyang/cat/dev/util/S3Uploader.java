package com.nyang.cat.dev.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

/**
 * S3서버로 파일 전송하는 메서드
 */
@Component
@RequiredArgsConstructor
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile uploadFile, String ext/*, String filePath*/) throws IOException {
        String fileName = UUID.randomUUID() + "." + ext;

        return putS3(uploadFile, fileName);
    }

    public String upload(MultipartFile uploadFile) throws IOException {
        String ext = getExt(uploadFile);

        if(isImageFile(uploadFile)){
            String fileName = UUID.randomUUID() + "." + ext;

            return putS3(uploadFile, fileName);
        }
        else{
            //todo 업로드 실패 시 exception 생성
            throw new IOException();
        }
    }


    // S3로 업로드
    private String putS3(MultipartFile uploadFile, String fileName) throws IOException {
        String result = null;

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(uploadFile.getSize());

        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile.getInputStream(), objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        URL url = amazonS3Client.getUrl(bucket, fileName);
        if(url != null) {
            result = url.toString();
        }

        return result;
    }

    //파일 삭제
    public void deleteFile(String fileUrl) throws IOException {
        int pos = fileUrl.lastIndexOf("/");
        String key = fileUrl.substring(pos+1);

        try{
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, key));

            System.out.println(String.format("[%s] deletion complete", key));

        } catch (Exception exception) {
            throw new IOException();
        }
    }

    public String getExt(MultipartFile imgFile) {
        //사진 확장자
        int pos = imgFile.getOriginalFilename().lastIndexOf(".");
        return imgFile.getOriginalFilename().substring(pos+1);
    }

    public boolean isImageFile(MultipartFile file) {
        if(!file.getContentType().contains("image")) return false;

        return true;
    }

}
