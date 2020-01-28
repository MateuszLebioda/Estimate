package com.MateuszLebioda;

public class Main {
    private float[][] moduly;

    Main(int liczbaStudentow, int liczbaModulow) {

        moduly = new float[liczbaStudentow][liczbaModulow];
        for(int i=0; i<moduly.length; i++){
            for(int j=0; j<moduly[i].length; j++){
                moduly[i][j] = 5;
            }
        }


    }

    void sout(){
        for(int i=0; i<moduly.length; i++){
            for(int j=0; j<moduly[i].length; j++){
                System.out.println(moduly[i][j] );
            }
        }
    }

    public static void main(String[] args) {
        Main m = new Main(5,5);
        m.sout();
    }
}
