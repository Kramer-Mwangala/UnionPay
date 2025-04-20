"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface InsuranceChartProps {
  timeRange: string
  chartType: "claims" | "enrollmentTrends" | "planDistribution" | "resolutionTime"
}

export function InsuranceChart({ timeRange, chartType }: InsuranceChartProps) {
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
      case "claims":
        type = "doughnut"
        data = {
          labels: ["Approved", "Pending", "Rejected"],
          datasets: [
            {
              data: [70, 20, 10],
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
      case "enrollmentTrends":
        type = "line"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "New Enrollments",
              data: [15, 20, 18, 25, 30, 35, 32, 40, 38, 45, 50, 55],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.5)",
              tension: 0.3,
            },
            {
              label: "Total Enrollments",
              data: [50, 70, 88, 113, 143, 178, 210, 250, 288, 333, 383, 438],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              tension: 0.3,
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }
        break
      case "planDistribution":
        type = "pie"
        data = {
          labels: ["Basic Health", "Standard Health", "Premium Health", "Life Insurance", "Disability"],
          datasets: [
            {
              data: [40, 25, 15, 12, 8],
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
      case "resolutionTime":
        type = "bar"
        data = {
          labels: ["Basic Health", "Standard Health", "Premium Health", "Life Insurance", "Disability"],
          datasets: [
            {
              label: "Average Resolution Time (days)",
              data: [7, 5, 3, 10, 8],
              backgroundColor: "rgba(59, 130, 246, 0.7)",
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Days",
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
