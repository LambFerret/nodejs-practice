import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class real {
    public static void main(String[] args) throws IOException {

// 1번방법
        byte[] data = Files.readAllBytes(Path.of("src/jpg2.jpg"));
        PrintWriter pw1 = new PrintWriter("src/txt1.txt");
        List<String> arr1 = new ArrayList<>();

        for (byte b : data){
            int c = b & 0xff;
            double d = c/127.5 -1 ;
            arr1.add(String.format("%.5f",d));
        }
        for(String i : arr1){
            System.out.println(i);
            pw1.println(i);
        }
        pw1.close();




        //2번방법
        BufferedImage bi = ImageIO.read(new File("src/jpg2.jpg"));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", baos);
        byte[] bytes = baos.toByteArray();
        List<String> arr2 = new ArrayList<>();
        PrintWriter pw2 = new PrintWriter("src/txt2.txt");

        for (byte b : bytes){
            int c = b & 0xff;
            double d = c/127.5 -1 ;
            arr2.add(String.format("%.5f",d));
        }
        for(String i : arr2){
            System.out.println(i);
            pw2.println(i);
        }
        pw2.close();

}}
