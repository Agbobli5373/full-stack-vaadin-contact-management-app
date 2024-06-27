package org.vaadin.example.data;

public class ContactStatus {
    private Long numberOfAvailable;
    private Long numberOfBusy;
    private Long numberOfAway;
    private Long numberOfOffline;

    public ContactStatus() {
        this.numberOfAvailable = 0L;
        this.numberOfBusy = 0L;
        this.numberOfAway = 0L;
        this.numberOfOffline = 0L;
    }

    public Long getNumberOfAvailable() {
        return numberOfAvailable;
    }

    public void setNumberOfAvailable(Long numberOfAvailable) {
        this.numberOfAvailable = numberOfAvailable;
    }

    public Long getNumberOfBusy() {
        return numberOfBusy;
    }

    public void setNumberOfBusy(Long numberOfBusy) {
        this.numberOfBusy = numberOfBusy;
    }

    public Long getNumberOfAway() {
        return numberOfAway;
    }

    public void setNumberOfAway(Long numberOfAway) {
        this.numberOfAway = numberOfAway;
    }

    public Long getNumberOfOffline() {
        return numberOfOffline;
    }

    public void setNumberOfOffline(Long numberOfOffline) {
        this.numberOfOffline = numberOfOffline;
    }
}
