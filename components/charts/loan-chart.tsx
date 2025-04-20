"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface LoanChartProps {
  timeRange: string
  chartType: "approvalRate" | "trends" | "purposes" | "repayment"
}

export function LoanChart({ timeRange, chartType }: LoanChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Generate data based on chart type and time range
    let data
    let options
    let type: "line" | "bar" | "pie" | "doughnut" = "line"

    // Generate different chart data based on the chart type
    switch (chartType) {
      case "approvalRate":
        type = "doughnut"
        data = {
          labels: ["Approved", "Pending", "Rejected"],
          datasets: [
            {
              data: [75, 15, 10],
              backgroundColor: ["rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(239, 68, 68, 0.7)"],
              borderWidth: 1,
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
        }
        break
      case "trends":
        type = "line"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Loan Amount ($)",
              data: [2000, 3500, 3000, 4200, 3800, 5000, 4500, 6000, 5500, 7000, 6500, 8000],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.5)",
              tension: 0.3,
              yAxisID: "y",
            },
            {
              label: "Number of Loans",
              data: [10, 15, 12, 18, 16, 22, 20, 25, 23, 28, 26, 32],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              tension: 0.3,
              yAxisID: "y1",
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              type: "linear",
              display: true,
              position: "left",
              beginAtZero: true,
              title: {
                display: true,
                text: "Amount ($)",
              },
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              beginAtZero: true,
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: "Count",
              },
            },
          },
        }
        break
      case "purposes":
        type = "pie"
        data = {
          labels: ["Medical", "Education", "Housing", "Business", "Personal"],
          datasets: [
            {
              data: [30, 25, 20, 15, 10],
              backgroundColor: [
                "rgba(59, 130, 246, 0.7)",
                "rgba(16, 185, 129, 0.7)",
                "rgba(245, 158, 11, 0.7)",
                "rgba(236, 72, 153, 0.7)",
                "rgba(139, 92, 246, 0.7)",
              ],
              borderWidth: 1,
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
        }
        break
      case "repayment":
        type = "bar"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "On-time Repayments",
              data: [85, 82, 88, 90, 92, 95],
              backgroundColor: "rgba(16, 185, 129, 0.7)",
            },
            {
              label: "Late Repayments",
              data: [10, 13, 8, 7, 6, 4],
              backgroundColor: "rgba(245, 158, 11, 0.7)",
            },
            {
              label: "Defaults",
              data: [5, 5, 4, 3, 2, 1],
              backgroundColor: "rgba(239, 68, 68, 0.7)",
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => value + "%",
              },
            },
          },
        }
        break
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options,
    })

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [timeRange, chartType])

  return <canvas ref={chartRef} />
}
