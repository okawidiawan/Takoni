package co.g2academy.takoni.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "t_multiple")
public class Multiple {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String questionText;

    @Column
    private String answer_1;

    @Column
    private Integer answer_1_point;

    @Column
    private String answer_2;

    @Column
    private Integer answer_2_point;
    
    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getAnswer_1() {
        return answer_1;
    }

    public void setAnswer_1(String answer_1) {
        this.answer_1 = answer_1;
    }

    public Integer getAnswer_1_point() {
        return answer_1_point;
    }

    public void setAnswer_1_point(Integer answer_1_point) {
        this.answer_1_point = answer_1_point;
    }

    public String getAnswer_2() {
        return answer_2;
    }

    public void setAnswer_2(String answer_2) {
        this.answer_2 = answer_2;
    }

    public Integer getAnswer_2_point() {
        return answer_2_point;
    }

    public void setAnswer_2_point(Integer answer_2_point) {
        this.answer_2_point = answer_2_point;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
