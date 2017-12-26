package ru.ifmo.se.iad.fourth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Point {
    private @Id @GeneratedValue Long id;
    private double x;
    private double y;
    private int r;
    private boolean isInside;
    private @JsonIgnore @ManyToOne Student owner;

    @SuppressWarnings("unused")
    public Point () {}

    public Point (final double x, final double y, final int r, final Student owner) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.r = r;
        setInside();
    }

    public void setInside(final boolean b) {
        setInside();
    }

    public void setInside() {
        isInside = ((x >= -r) && (x <= 0) && (y <= (double) r/2) && (y >= 0)) // rectangle
                || ((x <= 0) && (y <= 0) && (x*x + y*y <= r*r/4)) // circle
                || ((x >= 0) && (y <= 0) && (x - y*2 <= r));  // triangle
    }

    public void setX(double x) {
        this.x = x;
        setInside();
    }

    public void setY(double y) {
        this.y = y;
        setInside();
    }

    public void setR(int r) {
        this.r = r;
        setInside();
    }

    public int getR() {
        return r;
    }

    public double getY() {
        return y;
    }

    public double getX() {
        return x;
    }
}
