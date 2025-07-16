"use client";
import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Enhanced PDF styles for better readability
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 30,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    marginBottom: 8,
    fontSize: 12,
    color: "#444",
  },
  time: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#555",
  },
  questionContainer: {
    marginBottom: 25,
    borderBottom: "0.5px solid #eee",
    paddingBottom: 15,
  },
  questionText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  answerContainer: {
    marginLeft: 20,
    marginTop: 5,
  },
  answer: {
    marginBottom: 8,
    fontSize: 12,
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    fontSize: 10,
    textAlign: "center",
    color: "#666",
  },
});

const DownloadablePDF = async (paperData) => {
  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{paperData.paper_name}</Text>
          <Text style={styles.description}>{paperData.description}</Text>
          <Text style={styles.time}>Time: {paperData.timeLimit} minutes</Text>
        </View>

        {paperData.questions.map((q, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {index + 1}: {q.Question_Description}
            </Text>
            <View style={styles.answerContainer}>
              {q.Answers.map((a, i) => (
                <Text key={i} style={styles.answer}>
                  {String.fromCharCode(65 + i)}. {a.Answer_Description}
                </Text>
              ))}
            </View>
          </View>
        ))}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );

  // Generate the blob and auto-download
  const blob = await pdf(<MyDoc />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${paperData.paper_name}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};

export default DownloadablePDF;
