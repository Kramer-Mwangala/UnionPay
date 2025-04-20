"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface PaymentChartProps {
  timeRange: string
  chartType: "volume" | "trends" | "methods" | "status"
}

export function PaymentChart({ timeRange, chartType }: PaymentChartProps) {
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
      case "volume":
        type = "line"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Payment Volume ($)",
              data: [5000, 7500, 6800, 9200, 10500, 12000],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.5)",
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
      case "trends":
        type = "line"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Payment Volume ($)",
              data: [5000, 7500, 6800, 9200, 10500, 12000, 11500, 13000, 14500, 15000, 16200, 18000],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.5)",
              tension: 0.3,
              yAxisID: "y",
            },
            {
              label: "Number of Payments",
              data: [25, 35, 30, 42, 48, 55, 52, 60, 65, 70, 75, 85],
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
                text: "Volume ($)",
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
      case "methods":
        type = "doughnut"
        data = {
          labels: ["Mobile Money", "Bank Transfer", "Cash"],
          datasets: [
            {
              data: [65, 25, 10],
              backgroundColor: ["rgba(59, 130, 246, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)"],
              borderWidth: 1,
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
        }
        break
      case "status":
        type = "pie"
        data = {
          labels: ["Completed", "Pending", "Failed"],
          datasets: [
            {
              data: [85, 10, 5],
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
